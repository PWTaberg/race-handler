const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const Race = require('../models/Race');
// For adding runner to race
const RaceEntry = require('../models/RaceEntry');

// Stripe
const Stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const { v4: uuidv4 } = require('uuid');

/*
//Getting All
exports.getAllRaces = asyncHandler(async (req, res, next) => {
	const raceList = await Race.find();
	res.status(200).json({ success: true, count: raceList.length, raceList });
});

*/
//Getting All
exports.getAllRaces = asyncHandler(async (req, res, next) => {
	let query = null;
	let fields = null;
	let sortBy = null;
	let populateFields = null;

	// select: ?select=name, date
	// sort: ?sort=date, name  (ascending)
	// sort, descending: ?sort=-date (descending)
	// pagination: ?page=2&limit=8
	// populate: ?select=name,startNumber&sort=-name (descending)& populate=name
	// other params in query are used for filter selection ?raceStatus=archived  or ?raceStatus=completed

	// make a copy of req.query
	const reqQuery = { ...req.query };

	// Fields to exclude from query
	const removeFields = ['select', 'sort', 'page', 'limit', 'populate'];

	// Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	// Get string version of query object
	let queryStr = JSON.stringify(reqQuery);

	// Here we get the basic query-struct for find
	query = Race.find(JSON.parse(queryStr));

	// Select: If select is present - add to query the fields to be included in the query
	if (req.query.select) {
		fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	//Sort:
	if (req.query.sort) {
		sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		// default sorting
		query = query.sort('date');
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	// Add start value and limit to query
	query = query.skip(startIndex).limit(limit);

	// Get total number of records from DB
	let total = await Race.countDocuments();

	// Execute call to Mongo
	const raceList = await query;

	// Pagination result object
	const pagination = {};

	// Number of pages
	const pages = Math.ceil(total / limit);

	// Next page
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}

	// Prev page
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	// Add number of pages
	pagination.pages = pages;

	res.status(200).json({
		success: true,
		count: raceList.length,
		pagination,
		raceList,
	});
});

//Getting All
exports.getAllRaces3 = asyncHandler(async (req, res, next) => {
	/*
//Getting All
exports.getAllRacesOld = asyncHandler(async (req, res, next) => {
	
	const raceList = await Race.find();
	res.status(200).json({ success: true, count: raceList.length, raceList });
});


	// Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	/*

	// Add raceId as a query parameter
	// Needed if you want to list all entries of a specific race
	if (req.params.raceId) {
		reqQuery.race = req.params.raceId;
	}

	*/

	/*
	// Get string version of query object
	let queryStr = JSON.stringify(reqQuery);

	console.log('queryStr', queryStr);

	// Here we get the basic query for find - I think
	query = Race.find(JSON.parse(queryStr));

	// If select is present - add to query
	if (req.query.select) {
		fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	//Sort
	if (req.query.sort) {
		sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('name');
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	let total = 0;
	if (req.params.raceId) {
		// If race-entries per race
		total = await RaceEntry.countDocuments({ race: req.params.raceId });
	} else {
		// If total race-entries
		total = await RaceEntry.countDocuments();
	}

	/*
	// Populate
	if (req.query.populate) {
		populateFields = req.query.populate.split(',').join(' ');
		query = query.populate({
			path: 'race',
			select: populateFields,
		});
	}

	query = query.skip(startIndex).limit(limit);

	*/

	/*
	// Execute call to Mongo
	const raceList = await query;

	// Pagination result
	const pagination = {};

	const pages = Math.ceil(total / limit);

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	// Add number of pages
	pagination.pages = pages;

	/*
	res.status(200).json({
		success: true,
		count: raceEntries.length,
		pagination,
		raceEntries,
	});
	*/

	const raceList = await Race.find();
	res.status(200).json({ success: true, count: raceList.length, raceList });
});

//Getting All
exports.getAllRacesOld = asyncHandler(async (req, res, next) => {
	const raceList = await Race.find();
	res.status(200).json({ success: true, count: raceList.length, raceList });
});

//Getting One
exports.getSingleRace = asyncHandler(async (req, res, next) => {
	const race = await Race.findById(req.params.id);

	if (!race) {
		return next(
			new ErrorResponse(
				`Resource not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, race });
});

//Creating One
exports.createRace = asyncHandler(async (req, res, next) => {
	const newRace = await Race.create(req.body);

	res.status(200).json({ success: true, newRace });
});

//Updating One
exports.updateRace = asyncHandler(async (req, res, next) => {
	let race = null;
	race = await Race.findById(req.params.id);

	if (!race) {
		return next(
			new ErrorResponse(
				`Resource not found with id of ${req.params.id}`,
				404
			)
		);
	}
	const updatedRace = await Race.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, updatedRace });
});

//Deleting One
exports.deleteRace = asyncHandler(async (req, res, next) => {
	let race = null;
	race = await Race.findById(req.params.id);

	if (!race) {
		return next(
			new ErrorResponse(
				`Resource not found with id of ${req.params.id}`,
				404
			)
		);
	}
	await race.remove();
	res.status(200).json({ success: true });
});

// Get Payment
exports.getPayment = asyncHandler(async (req, res, next) => {
	// Check that race exists
	// Do payment
	// Update Race with entries = entries + 1
	// Update race entries

	const { product, token, runner, raceId } = req.body;
	const runnerEmail = token.email;

	// Check that race exists
	const race = await Race.findById(raceId);

	if (!race) {
		return next(
			new ErrorResponse(
				`No race with the id of ${req.params.raceId}`,
				404
			)
		);
	}

	// Do payment
	const idempotencyKey = uuidv4();

	// Call Stripe, get customer
	const customer = await Stripe.customers.create({
		email: token.email,
		source: token.id,
	});

	// Do transaction ?
	const result = Stripe.charges.create(
		{
			amount: product.price * 100,
			currency: 'sek',
			customer: customer.id,
			description: `Your registration for ${product.name} is ready`,
		},
		{ idempotencyKey }
	);

	// byt till races, ändra i model så att race blir singular vid export
	// Prepare data for adding race entry to db
	const raceEntryInfo = {
		name: runner,
		email: runnerEmail,
		race: raceId,
		startNumber: race.entries + 1,
	};

	// Update RaceEntry table in Mongo
	const raceEntry = await RaceEntry.create(raceEntryInfo);

	// Get  updated number of entries in race
	const entries = await RaceEntry.countDocuments({ race: raceId });

	// Update #entries in actual Race
	const updatedRace = await Race.findByIdAndUpdate(
		raceId,
		{ entries: entries },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({ success: true, result });
});
