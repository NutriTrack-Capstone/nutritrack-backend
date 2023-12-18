const foodModel = require("../models/foodModel");

const getFood = async (req, res) => {
    // const { character } = req.params;
    const result = await foodModel.getFood(req.query.name);
    res.status(200).json({ status: "success", data: result });
}

module.exports = {
    getFood,
}