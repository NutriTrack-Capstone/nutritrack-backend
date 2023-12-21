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

const getCustomFood = async (req, res) => {
    // const { character } = req.params;
    const result = await foodModel.getCustomFood(req.query.name);
    if(result.length > 0){
        res.status(200).json({status:"success", data:result});
    } else {
        res.status(404).json({status:"error", message:"Failed to fetch food information"});
    }
    
}

module.exports = {
    getFood,
    getCustomFood
}