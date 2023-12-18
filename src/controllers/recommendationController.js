const { getFoodByCalories } = require('../models/recommendationModel.js');
const { mealCalRec } = require('../services/recommendationService');

const getFoodRecommendation = async (req, res) => {
  try {
    // Access query parameters instead of req.body
    const maintenanceCalories = Math.floor(req.query.maintenanceCalories);
    const calorieLeft = Math.floor(req.query.calorieLeft);

    // Get the recommended calorie intake for a meal
    const recommendedCalories = mealCalRec(maintenanceCalories, calorieLeft);

    // Fetch food recommendations based on recommended calories
    const foodRecommendations = await getFoodByCalories(recommendedCalories);

    res.status(200).json({ status: "success", data: foodRecommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getFoodRecommendation,
};
