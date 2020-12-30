const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const RaceEntry = require('../models/RaceEntry');
const Race = require('../models/Race');
//const User = require('../models/User');

// @desc Get all race entries
// @route GET /api/v1/race-entries
// @route GET /api/v1/race-list/:raceId/race-entries
// @route GET /api/v1/user/:userId/race-entries
// @access Public
exports.getRaceEntries = asyncHandler(async (req, res, next) => {
	console.log('getRaceEntries');
	let query = null;
	let fields = null;
	let sortBy = null;
	let populateFields = null;

	// make a copy of req.query
	const reqQuery = { ...req.query };

	// Fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit', 'populate'];

	// Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	// Add raceId as a query parameter
	// Needed if you want to list all entries of a specific race
	if (req.params.raceId) {
		reqQuery.race = req.params.raceId;
	}

	// Get string version of query object
	let queryStr = JSON.stringify(reqQuery);

	// Get all entries in all races - why would we need this ?
	// We should add to find all entries for a User
	query = RaceEntry.find(JSON.parse(queryStr));

	// put select fields in query
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
	const total = await RaceEntry.countDocuments();

	// Populate
	if (req.query.populate) {
		populateFields = req.query.populate.split(',').join(' ');
		query = query.populate({
			path: 'race',
			select: populateFields,
		});
	}

	console.log(
		`page ${page} limit ${limit} startIndex ${startIndex} endIndex ${endIndex} total ${total}`
	);

	query = query.skip(startIndex).limit(limit);

	// Do the call to Mongo
	const raceEntries = await query;

	// Pagination result
	const pagination = {};

	const pages = Math.ceil(total / limit);
	console.log(total);
	console.log(limit);
	console.log(pages);
	console.log(total / limit);

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

	res.status(200).json({
		success: true,
		count: raceEntries.length,
		pagination,
		raceEntries,
	});
});

// Skip this

// @desc Add race entry
// @route POST /api/v1/race-list/:raceId/race-entry
// @access Private
exports.addRaceEntry = asyncHandler(async (req, res, next) => {
	console.log('In addRaceEntry');
	console.log(req.params);
	req.body.race = req.params.raceId;

	//req.body.user = req.user.id;

	// Check that the race exists
	const race = await Race.findById(req.params.raceId);

	if (!race) {
		return next(
			new ErrorResponse(
				'No race with the id of ${req.params.raceId}',
				404
			)
		);
	}

	// Add start number
	console.log('Race entries');
	console.log(race.entries);
	req.body.startNumber = race.entries + 1;

	console.log(req.body);

	// Check in the same way that the user exists

	const raceEntry = await RaceEntry.create(req.body);

	res.status(200).json({
		success: true,
		raceEntry,
	});
});
