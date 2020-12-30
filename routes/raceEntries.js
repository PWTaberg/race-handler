const express = require('express');
const { getRaceEntries, addRaceEntry } = require('../controllers/raceEntries');

// Obs merge params
const router = express.Router({ mergeParams: true });

//const Race = require('../models/Race');
// skip the post method
router.route('/').get(getRaceEntries).post(addRaceEntry);

//router.route('/:id').post(addRaceEntry);

module.exports = router;
