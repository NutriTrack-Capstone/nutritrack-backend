const axios = require('axios');
const { imageBufferTo3DArray } = require('../services/imageService');
const { getCustomFood } = require('../models/foodModel');

const imageDetection = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    const imageBuffer = req.file.buffer;

    try {
        const imageArray = await imageBufferTo3DArray(imageBuffer);

        // Make a request to the ML Model API
        const modelResponse = await axios.post('https://nutritrack-tf-serving-ggq4e34rzq-et.a.run.app/v1/models/nutritrack:predict', {
            signature_name: "predict_image_class",
            instances: [imageArray],
        });

        // console.log({status:"success", data: {score:modelResponse.data.predictions[0].score[0]}})

        if(modelResponse.data.predictions.length > 0){
            const result = await getCustomFood(req.query.name);
            if (result.status === "success") {
                res.status(200).json({status:"success", data: {score:modelResponse.data.predictions[0].score[0], result}});
            } else {
                res.status(400).json(result);
            }
        } else {
            res.status(404).json({ status: "error", message: "Cannot predict image" });
        }
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ status: "error", message: "Error processing image" });
    }
};

module.exports = {
    imageDetection,
};