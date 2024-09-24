const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require("path");
const cors = require('cors');
const fs = require('fs');
const { cloudinary } = require("./db/cloudinary/upload");

const upload = multer(); // For handling multipart form data (image upload)
const app = express();
const port = 4000;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('public'));

// Test route
app.get("/refurb", (req, res) => {
    const filePath = path.join(__dirname, "/db/items.json");
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent) {
            try {
                const existingData = JSON.parse(fileContent);
                const filtered = existingData.filter(item => item.refurb >= 3)
                console.log("sending to client: ", filtered)
                res.status(200).json(filtered);
            } catch (err) {
                console.error("Error parsing JSON:", err);
                res.status(503)
            }
        }
    } else {
        console.log("File doesn't exist. Creating new one.");
        res.send(404)
    }
});

// Handle form submission with image upload
app.post("/new/waste", upload.single('image'), (req, res) => {
    const formData = req.body; // Get form data fields
    const image = req.file;    // Get uploaded file (image)

    if (!image) {
        return res.status(400).json({ error: "Image file is required!" });
    }
    console.log("attempting image upload...");

    // Upload the image to Cloudinary
    cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return res.status(500).json({ error: "Failed to upload image" });
        }

        console.log("Image uploaded to Cloudinary:", result);

        // Write form data (along with image URL) to JSON file
        const itemData = {
            ...formData,
            imageUrl: result.secure_url // Use the image URL from Cloudinary
        };
        console.log("saved item: ", itemData)

        try {
            const filePath = path.join(__dirname, "/db/items.json");

            // Initialize the file if it doesn't exist or is empty
            let existingData = [];

            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (fileContent) {
                    try {
                        existingData = JSON.parse(fileContent);
                    } catch (err) {
                        console.error("Error parsing JSON:", err);
                        existingData = [];
                    }
                }
            } else {
                console.log("File doesn't exist. Creating new one.");
            }

            existingData.push(itemData); // Add new item data

            // Write updated data back to JSON file
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

            res.status(201).json({ message: "Waste item added successfully!", item: itemData });
        } catch (err) {
            console.error("Error writing to file:", err);
            res.status(500).json({ error: "Failed to save data" });
        }
    }).end(image.buffer); // Use the image buffer for upload_stream
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});
