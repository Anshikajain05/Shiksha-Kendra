const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

const port = process.env.PORT || 5000;

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Cloudinary Configuration
// These values MUST be added to Vercel Environment Variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'shiksha_kendra_books',
        resource_type: 'auto', // Allows PDFs and Images
        allowed_formats: ['jpg', 'png', 'pdf']
    },
});
const upload = multer({ storage: storage });

// 3. MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb+srv://book-store:asl9znRKPPxu69an@cluster0.dsdvlc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let db, booksCollections, commentsCollection, storiesCollection, countersCollection;

async function connectDB() {
    if (db) return db;
    await client.connect();
    db = client.db("BookInventory");
    booksCollections = db.collection("books");
    commentsCollection = db.collection("comments");
    storiesCollection = db.collection("stories");
    countersCollection = db.collection("siteStats");
    return db;
}

// 4. Routes
app.get('/', (req, res) => res.send('Shiksha Kendra Server Running'));

// UPLOAD NEW RESOURCE (Modified for Cloudinary)
app.post("/upload-books", upload.single("bookFile"), async (req, res) => {
    try {
        await connectDB();
        const data = req.body;
        if (req.file) {
            data.bookPDFURL = req.file.path; // This is the new Cloudinary HTTPS URL
        }
        const result = await booksCollections.insertOne(data);
        await countersCollection.updateOne({ name: "globalStats" }, { $inc: { resourceAvailable: 1 } });
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: "Upload failed", error: error.message });
    }
});

app.get("/all-books", async (req, res) => {
    await connectDB();
    const result = await booksCollections.find().toArray();
    res.send(result);
});

app.get("/book/:id", async (req, res) => {
    try {
        await connectDB();
        const result = await booksCollections.findOne({ _id: new ObjectId(req.params.id) });
        res.send(result || { message: "Not found" });
    } catch (err) { res.status(400).send("Invalid ID"); }
});

app.patch("/book/:id", upload.single("bookFile"), async (req, res) => {
    try {
        await connectDB();
        const updateData = req.body;
        if (req.file) updateData.bookPDFURL = req.file.path;
        const result = await booksCollections.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
        res.send(result);
    } catch (error) { res.status(500).send(error.message); }
});

app.delete("/book/:id", async (req, res) => {
    try {
        await connectDB();
        const result = await booksCollections.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(result);
    } catch (error) { res.status(500).send(error.message); }
});

app.get("/site-stats", async (req, res) => {
    await connectDB();
    const stats = await countersCollection.findOne({ name: "globalStats" });
    res.send(stats);
});

app.get("/all-stories", async (req, res) => {
    await connectDB();
    const result = await storiesCollection.find().sort({ createdAt: -1 }).toArray();
    res.send(result);
});

app.get("/comments/:bookId", async (req, res) => {
    await connectDB();
    const result = await commentsCollection.find({ bookId: req.params.bookId.trim() }).sort({ createdAt: -1 }).toArray();
    res.send(result);
});

// For Vercel, we export the app. For local testing, we listen.
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
}

module.exports = app;
