const foodModel = require("../models/foodModel");

const getFood = async (req, res) => {
    const { character } = req.params;
    const result = await foodModel.getFood(character);
    res.json(result);
}

module.exports = {
    getFood,
}