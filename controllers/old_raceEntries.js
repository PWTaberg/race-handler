// const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const RaceEntry = require('../models/RaceEntry');
// const Race = require('../models/Race');

exports.getRaceEntries = asyncHandler(async (req, res, next) => {
	console.log('getRaceEntries');
	let query = null;
	let fields = null;
	let sortBy = null;
	let populateFields = null;

	const reqQuery = { ...req.query };

	const removeFields = ['select', 'sort', 'page', 'limit', 'populate'];

	removeFields.forEach((param) => delete reqQuery[param]);

	if (req.param.raceId) {
		reqQuery.race = req.param.raceId;
	}

	let queryStr = JSON.stringify(reqQuery);

	query = RaceEntry.find(JSON.parse(queryStr));

	if (req.query.select) {
		fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	if (req.query.sort) {
		sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('name');
	}

	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await RaceEntry.countDocuments();

	if (req.query.populate) {
		populateFields = req.query.populate.split(',').join(' ');
		query = query.populate({
			path: 'race',
			select: populateFields,
		});
	}

	query = query.skip(startIndex).limit(limit);

	const raceEntries = await query;

	const pagination = {};

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

	res.status(200).json({
		success: true,
		count: raceEntries.length,
		pagination,
		raceEntries,
	});
});
