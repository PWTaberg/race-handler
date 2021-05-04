const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const User = require('../models/User');

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
	console.log('register', req.body);

	// FIX - remove role
	const { name, email, password, role } = req.body;
	// Create user
	// FIX - remove role
	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	// Send token in cookie
	sendTokenResponse(user, 200, res);
});

// @desc Login user
// @route  POST/api/v1/auth/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email & password
	if (!email || !password) {
		return next(new ErrorResponse('Provide an email and password', 400));
	}

	// Check for user
	// This time we want the password, otherwise not
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Check if entered password matches in db
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}
	// Send token in cookie
	sendTokenResponse(user, 200, res);
});

// @desc   Get current logged in user
// @route  GET/api/v1/auth/me
// @access Private

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	// NO FIX - role/isAdmin included in user
	res.status(200).json({
		success: true,
		user,
	});
});

// @desc   Update user details
// @route  PUT/api/v1/auth/updatedetails
// @access Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
	const fieldsToUpdate = {
		name: req.body.name,
		email: req.body.email,
	};

	const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc   Update password
// @route  PUT/api/v1/auth/updatepassword
// @access Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
	// Get user + password from db(by default we do not want password to be sent back)
	const user = await User.findById(req.user.id).select('+password');

	// Check current password
	if (!(await user.matchPassword(req.body.currentPassword))) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	// Update db with new password
	user.password = req.body.newPassword;
	await user.save();

	// Send token in cookie
	sendTokenResponse(user, 200, res);
});

// @desc   Reset password
// @route  PUT/api/v1/auth/resetpassword:resettoken
// @access Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token

	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	// get token, expire - only if it has not expired
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// Set new password
	// It will be encrypted since it is not modified
	// clear resetPasswordToken and resetPasswordExpire
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	// Send token in cookie
	sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();

	// 30 days and only accessable through client side script
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}
	// options.secure = true;

	// include key/token/options
	res.status(statusCode)
		.cookie('token', token, options)
		.json({ success: true, token });
};

// @desc   Forgot password
// @route  POST/api/v1/auth/forgotpassword
// @access Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorResponse('There is no user with that email', 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	// Save resetToken, no validation
	await user.save({ validateBeforeSave: false });

	// Send email::
	// Create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/auth/resetpassword/${resetToken}`;

	// Not the way to do it in react, check video 11.20
	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		/* await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        }); */

		return res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });
		return next(new ErrorResponse('Email could not be sent', 500));
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});
