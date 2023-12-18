const foodModel = require("../models/foodModel");

const getFood = async (req, res) => {
    // const { character } = req.params;
    const result = await foodModel.getFood(req.query.name);
    if (result.status === "success") {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
}

module.exports = {
    getFood,
}