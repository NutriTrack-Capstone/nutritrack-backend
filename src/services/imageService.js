const Image = require("image-js");
const sharp = require("sharp")

async function imageBufferTo3DArray(imageBuffer) {
    try {
        // Convert image buffer to RGB buffer
        const rgbBuffer = await sharp(imageBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
        // Get image data
        const { data, info } = rgbBuffer;
  
        // Convert image data to a 3D array
        const imageArray = [];
        let index = 0;
  
        for (let y = 0; y < info.height; y++) {
            const row = [];
            for (let x = 0; x < info.width; x++) {
                const pixel = [];
                for (let c = 0; c < 3; c++) {
                    pixel.push(data[index]);
                    index++;
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

const fs = require("fs")
const imagePath = "../../img/lemon.png"
const imageBuffer = fs.readFileSync(imagePath)

imageBufferTo3DArray(imageBuffer).then((imageArray) => {
    console.log(imageArray)
})