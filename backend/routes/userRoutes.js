const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/userControllers');

// This will be added after the existing url 
router.route('/').post(registerUser);

// router.post('/login',authUser)

module.exports = router;