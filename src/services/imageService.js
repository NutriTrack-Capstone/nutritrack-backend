const Jimp = require("jimp");
const fs = require("fs");

async function imageBufferTo3DArray(imageBuffer) {
    try {
        // Read the image with Jimp
        const image = await Jimp.read(imageBuffer);

        image.resize(224, 224);

        // Get image data
        const { width, height, data } = image.bitmap;

        // Convert image data to a 3D array
        const imageArray = [];

        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                const pixel = [];
                for (let c = 0; c < 3; c++) {
                    pixel.push(data[y * width * 4 + x * 4 + c]);
                }
                row.push(pixel);
            }
            imageArray.push(row);
        }

        return imageArray;
    } catch (error) {
        console.error('Error converting image to 3D array:', error.message);
    }
}

module.exports = {
    imageBufferTo3DArray
}

// const imagePath = "img/lemon.png";
// const imageBuffer = fs.readFileSync(imagePath);
// console.log(imageBuffer)

// imageBufferTo3DArray(imageBuffer).then((imageArray) => {
//     console.log(imageArray);
// });