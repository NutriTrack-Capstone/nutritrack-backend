const express = require('express');
const { saveUserProfile } = require('../controllers/userProfileController');
const router = express.Router();

router.post("/user-profile", saveUserProfile);

module.exports = router;