const express = require('express');
const {
    register,
    login,
    getUser,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword
} = require('../controllers/auth');

// Include other resource routers
const raceEntryRouter = require('./raceEntries');

const router = express.Router();

const { protect } = require('../middleware/auth');
// Re-route into other resource routers
router.use('/race-entries', raceEntryRouter);

router.post('/register', register);
router.post('/login', login);
router.get('/user', protect, getUser);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
