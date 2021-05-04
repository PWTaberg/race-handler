const express = require('express');
const {
	getAllRaces,
	createRace,
	getSingleRace,
	updateRace,
	deleteRace,
	getPayment,
} = require('../controllers/raceList');

// Include other resource routers
const raceEntryRouter = require('./raceEntries');

const router = express.Router();

// Needed for access control
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:raceId/race-entries', raceEntryRouter);

router
	.route('/')
	.get(getAllRaces)
	.post(protect, authorize('admin'), createRace);

// protect, authorize('publisher', 'admin'),
router
	.route('/:id')
	.get(getSingleRace)
	.put(protect, authorize('admin'), updateRace)
	.delete(protect, authorize('admin'), deleteRace);

router.route('/payment').post(protect, getPayment);

module.exports = router;
