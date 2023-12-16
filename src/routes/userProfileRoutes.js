const express = require('express');
const { saveUserProfile, updateUserProfile, updateDailyNutrition, getDailyNutrition, getUserProfileByUsername} = require('../controllers/userProfileController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/user-profile", saveUserProfile);
router.put("/user-profile", updateUserProfile);
router.get("/user-profile/:username", authMiddleware, getUserProfileByUsername);
router.put("/nutrition-user", updateDailyNutrition);
router.get("/nutrition-user/:username", authMiddleware, getDailyNutrition);

module.exports = router;