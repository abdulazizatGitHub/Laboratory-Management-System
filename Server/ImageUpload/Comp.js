import sharp from 'sharp';
import fs from 'fs';

// Function to compress image upon upload
const compressImage = async (req, res, next) => {
    try {
        // Check if there's an uploaded file
        if (req.file) {
            // Compress the image using sharp
            await sharp(req.file.buffer)
                .resize({ width: 800 }) // Resize if needed
                .toFormat('jpeg') // Convert to JPEG format
                .toFile(`./uploads/compressed_${req.file.originalname}`); // Save the compressed image to disk
        }
        next(); // Move to the next middleware or route handler
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
};

// Function to decompress image upon retrieval
const decompressImage = async (req, res, next) => {
    try {
        // Load the compressed image from disk
        const compressedImageBuffer = await fs.promises.readFile(`./uploads/compressed_${req.params.imageName}`);
        
        // Decompress the image using sharp
        const decompressedImageBuffer = await sharp(compressedImageBuffer).toBuffer();

        // Attach the decompressed image buffer to the request object
        req.imageBuffer = decompressedImageBuffer;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
};


export {
    compressImage,decompressImage
}
// // Route handler to serve the decompressed image
// router.get("/image/:imageName", decompressImage, (req, res) => {
//     // Send the decompressed image to the client
//     res.end(req.imageBuffer);
// });
