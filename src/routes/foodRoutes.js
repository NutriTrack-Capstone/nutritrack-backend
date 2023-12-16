const express = require('express');
const { getFood } = require('../controllers/foodController');
const router = express.Router();

router.get("/food/:character", getFood);

module.exports = router;