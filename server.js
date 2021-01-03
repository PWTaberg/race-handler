require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/error');

const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

const connectDB = async () => {
	try {
		const constant = await mongoose.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err);
	}
};

connectDB();

app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const raceList = require('./routes/raceList');
const raceEntries = require('./routes/raceEntries');
const productList = require('./routes/productList');
const auth = require('./routes/auth');

app.use('/api/v1/race-list', raceList);
app.use('/api/v1/race-entries', raceEntries);
app.use('/api/v1/product-list', productList);
app.use('/api/v1/auth', auth);

// route for stripe to return key to client
app.get('/api/v1/config/stripe', (req, res) => {
	res.send(process.env.STRIPE_PUBLIC);
});

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
