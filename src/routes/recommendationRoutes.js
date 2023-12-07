const express = require('express');
const router = express.Router();

const { getFoodRecommendation } = require('../controllers/recommendationController');

router.get('/recommendation', getFoodRecommendation);

module.exports = router;