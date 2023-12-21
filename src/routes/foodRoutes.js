const express = require('express');
const { getFood, getCustomFood } = require('../controllers/foodController');
const router = express.Router();

router.get("/food", getFood);
router.get("/custom-food", getCustomFood);

module.exports = router;