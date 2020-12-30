const express = require('express');
const { getRaceEntries } = require('../controllers/raceEntries');

const router = express.Router({ mergeParams: true });

router.route('/').get(getRaceEntries);

module.exports = router;
