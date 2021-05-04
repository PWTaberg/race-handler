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
//FIX -
//const { protect, authorize } = require('../middleware/auth');
const { protect, admin } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:raceId/race-entries', raceEntryRouter);

/* FIX
router
	.route('/')
	.get(getAllRaces)
	.post(protect, authorize('admin'), createRace); */
router.route('/').get(getAllRaces).post(protect, admin, createRace);
// protect, authorize('publisher', 'admin'),
/* FIX
router
	.route('/:id')
	.get(getSingleRace)
	.put(protect, authorize('admin'), updateRace)
	.delete(protect, authorize('admin'), deleteRace); */
router
	.route('/:id')
	.get(getSingleRace)
	.put(protect, admin, updateRace)
	.delete(protect, admin, deleteRace);

router.route('/payment').post(protect, getPayment);

module.exports = router;
