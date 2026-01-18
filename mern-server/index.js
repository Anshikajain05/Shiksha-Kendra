const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Use process.env.PORT for Render/Vercel compatibility
const port = process.env.PORT || 5000;

// 1. Middleware
app.use(cors({
    origin: [
        "https://shiksha-kendra.vercel.app", // Your Production URL
        "http://localhost:5173",             // Local Vite Dev URL
        /\.vercel\.app$/                     // Allows all Vercel preview links
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

app.use(express.json());

// 2. Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'shiksha_kendra_books',
        resource_type: 'auto', 
        allowed_formats: ['jpg', 'png', 'pdf']
    },
});
const upload = multer({ storage: storage });

// 3. MongoDB Connection
// Use the variable from Render/Vercel dashboard
const uri = process.env.MONGODB_URI; 

const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let db, booksCollections, commentsCollection, storiesCollection, countersCollection;

async function connectDB() {
    if (db) return db;
    try {
        await client.connect();
        db = client.db("BookInventory");
        booksCollections = db.collection("books");
        commentsCollection = db.collection("comments");
        storiesCollection = db.collection("stories");
        countersCollection = db.collection("siteStats");
        return db;
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

// 4. Routes
app.get('/', (req, res) => res.send('Shiksha Kendra Server Running'));

// ... (Your existing routes for /upload-books, /all-books, etc. stay exactly the same)

// 5. Final Export / Listen
// This change ensures the server runs on Render AND Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
} else {
    // For Vercel Serverless Functions
    app.listen(port); 
}

module.exports = app;
