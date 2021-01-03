const express = require('express');
const {
	getRaceEntries,
	getRaceEntriesByUser,
	addRaceEntry,
} = require('../controllers/raceEntries');

// Obs merge params
const router = express.Router({ mergeParams: true });

//const Race = require('../models/Race');
// skip the post method
router.route('/').get(getRaceEntries).post(addRaceEntry);

//router.route('/:id').post(addRaceEntry);
router.route('/:email').get(getRaceEntriesByUser);

module.exports = router;
