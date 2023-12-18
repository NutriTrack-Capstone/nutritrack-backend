const UserProfileModel = require("../models/userProfileModel");
const { calculateDailyCalories, calculateDailyCarbo, calculateDailyProtein, calculateDailyFat } = require("../services/dailyCalorieService");

const saveUserProfile = async (req, res) => {
    const { username, age, height, weight, gender } = req.body;
    const calories = calculateDailyCalories(weight, height, gender, age);
    const carbo = calculateDailyCarbo(calories);
    const protein = calculateDailyProtein(calories);
    const fat = calculateDailyFat(calories);

    const result = await UserProfileModel.createUserProfile(username, age, height, weight, gender, calories, carbo, protein, fat);

    if (result.status === "success") {
        res.status(201).json(result);
    } else {
        res.status(400).json(result);
    }
};

const updateUserProfile = async (req, res) => {
    const { username, age, height, weight, gender } = req.body;
    const result = await UserProfileModel.updateUserProfile(username, age, height, weight, gender);

    if (result.status === "success") {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
};

const updateDailyNutrition = async (req, res) => {
    const { username, calories, carbo, protein, flat } = req.body;
    const result = await UserProfileModel.updateDailyNutrition(username, calories, carbo, protein, flat);

    if (result.status === "success") {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
};

const getDailyNutrition = async (req, res) => {
    const { username } = req.params;
    const result = await UserProfileModel.getDailyNutrition(username);

    res.status(result.status === "success" ? 200 : 404).json(result);
};

const getUserProfileByUsername = async (req, res) => {
    const { username } = req.params;
    const result = await UserProfileModel.getUserProfileByUsername(username);

    res.status(result.status === "success" ? 200 : 404).json(result);
};

module.exports = {
    saveUserProfile,
    updateUserProfile,
    updateDailyNutrition,
    getDailyNutrition,
    getUserProfileByUsername
}