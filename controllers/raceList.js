const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const Race = require('../models/Race');
// For adding runner to race
const RaceEntry = require('../models/RaceEntry');

// Stripe
const Stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const { v4: uuidv4 } = require('uuid');

//Getting All
exports.getAllRaces = asyncHandler(async (req, res, next) => {
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
