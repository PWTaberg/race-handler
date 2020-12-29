const express = require('express');
const {
    getAllRaces,
    createRace,
    getSingleRace,
    updateRace,
    deleteRace,
    getPayment
} = require('../controllers/raceList');

const raceEntryRouter = require('./raceEntries');

const router = express.Router();

router.use('/:raceId/race-entries', raceEntryRouter);

router
    .route('/')
    .get(getAllRaces)
    .post(createRace);

router
    .route('/:id')
    .get(getSingleRace)
    .put(updateRace)
    .delete(deleteRace);

router.route('/payment').post(getPayment);

module.exports = router;