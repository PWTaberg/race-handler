const express = require('express');
const {
	getRaceEntries,
	getRaceEntriesByUser,
	addRaceEntry,
} = require('../controllers/raceEntries');

const { protect, admin } = require('../middleware/auth');

// Obs merge params
const router = express.Router({ mergeParams: true });

//const Race = require('../models/Race');
// skip the post method
router.route('/').get(getRaceEntries).post(addRaceEntry);

router.route('/user').get(protect, getRaceEntriesByUser);

module.exports = router;
