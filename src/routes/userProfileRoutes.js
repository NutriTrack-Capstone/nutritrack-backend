const express = require('express');
const { saveUserProfile, updateUserProfile, updateDailyNutrition, getDailyNutrition, getUserProfileByUsername, resetAllDailyNutrition, resetDailyNutritionByUsername} = require('../controllers/userProfileController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/user-profile", saveUserProfile);
router.put("/user-profile", updateUserProfile);
router.get("/user-profile/:username", authMiddleware, getUserProfileByUsername);
router.put("/nutrition-user", updateDailyNutrition);
router.get("/nutrition-user/:username", authMiddleware, getDailyNutrition);
router.put("/all-daily-nutrition", resetAllDailyNutrition);
router.put("/daily-nutrition/:username", resetDailyNutritionByUsername);

module.exports = router;