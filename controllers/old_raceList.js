const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const Race = require('../models/Race');
const RaceEntry = require('../models/RaceEntry');

const Stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const { v4: uuid4 } = require('uuid');

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

exports.getPayment = asyncHandler(async (req, res, next) => {
	const { product, token, runner, raceId } = req.body;
	const runnerEmail = token.email;

	const race = await Race.findById(raceId);

	if (!race) {
		return next(new ErrorResponse(`No race with the id of ${raceId}`, 404));
	}

	const idempotencyKey = uuid4();

	const customer = await Stripe.customers.create({
		email: token.email,
		source: token.id,
	});

	const result = Stripe.charges.create(
		{
			amount: product.price * 100,
			currency: 'sek',
			customer: customer.id,
			description: `Your registration for ${product.name} is ready`,
		},
		{ idempotencyKey }
	);

	const raceEntryInfo = {
		name: runner,
		email: runnerEmail,
		race: raceId,
		startNumber: race.entries + 1,
	};

	const raceEntry = await RaceEntry.create(raceEntryInfo);

	const updatedRace = await Race.findByIdAndUpdate(
		raceId,
		{ entries: race.entries + 1 },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({ success: true, result });
});
