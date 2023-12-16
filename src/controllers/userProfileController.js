const UserProfileModel = require("../models/userProfileModel");
const { calculateDailyCalories, calculateDailyCarbo, calculateDailyProtein, calculateDailyFat } = require("../services/dailyCalorieService");

const saveUserProfile = async (req, res) => {
    const { username, age, height, weight, gender } = req.body
    const calories = calculateDailyCalories(weight, height, gender, age);
    const carbo = calculateDailyCarbo(calories);
    const protein = calculateDailyProtein(calories);
    const fat = calculateDailyFat(calories);

    const result = await UserProfileModel.createUserProfile(username, age, height, weight, gender, calories, carbo, protein, fat);
    res.json({ message: result })
}

module.exports = {
    saveUserProfile
}