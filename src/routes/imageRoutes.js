const express = require('express');
const { imageDetection } = require('../controllers/imageController');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/image-detection", upload.single('image'), imageDetection);

module.exports = router;
