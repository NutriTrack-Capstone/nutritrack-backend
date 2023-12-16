const express = require('express');
const { getFood } = require('../controllers/foodController');
const router = express.Router();

router.get("/food", getFood);

module.exports = router;