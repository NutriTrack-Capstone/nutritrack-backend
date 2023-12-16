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

const updateUserProfile = async (req, res) => {
    const { username, age, height, weight, gender } = req.body
    const result = await UserProfileModel.updateUserProfile(username, age, height, weight, gender);
    res.json({ message: result })
}

const updateDailyNutrition = async (req, res) => {
    const { username, calories, carbo, protein, flat } = req.body
    const result = await UserProfileModel.updateDailyNutrition(username, calories, carbo, protein, flat);
    res.json({ message: result })
}

const getDailyNutrition = async (req, res) => {
    const { username } = req.params;
    const result = await UserProfileModel.getDailyNutrition(username);
    res.json(result);
};

const getUserProfileByUsername = async (req, res) => {
    const { username } = req.params;
    const result = await UserProfileModel.getUserProfileByUsername(username);
    res.json(result);
};

module.exports = {
    saveUserProfile,
    updateUserProfile,
    updateDailyNutrition,
    getDailyNutrition,
    getUserProfileByUsername
}