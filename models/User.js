crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Add a name'],
	},
	email: {
		type: String,
		required: [true, 'Add an email'],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Add a valid email',
		],
	},
	// FIX - replace role
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	// REMOVE -
	/*role: {
		type: String,
		enum: ['user'],
		default: 'user',
	},*/
	password: {
		type: String,
		required: [true, 'Add a password'],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
	// If password is not modified, then skip this step (happened in restPasswordToken generation/save)
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash pasword token
UserSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Has token and set to resetPaswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// Set expire  to 10 minutes
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	// return original resetToken
	return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
