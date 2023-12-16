const express = require('express');
const { saveUserProfile, updateUserProfile, updateDailyNutrition, getDailyNutrition} = require('../controllers/userProfileController');
const router = express.Router();

router.post("/user-profile", saveUserProfile);
router.put("/user-profile", updateUserProfile);
router.put("/nutrition-user", updateDailyNutrition);
router.get("/nutrition-user/:username", getDailyNutrition);

module.exports = router;