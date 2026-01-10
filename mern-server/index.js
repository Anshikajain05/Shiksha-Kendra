const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config(); // Ensure you have this

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb+srv://book-store:asl9znRKPPxu69an@cluster0.dsdvlc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: { 
        version: ServerApiVersion.v1, 
        strict: true, 
        deprecationErrors: true 
    }
});

// We connect to the DB once and reuse the connection
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

// --- ROUTES ---

app.get("/", (req, res) => res.send("Shiksha Kendra Server Running"));

// GET ALL RESOURCES
app.get("/all-books", async (req, res) => {
    try {
        await connectDB();
        const result = await booksCollections.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET SINGLE RESOURCE BY ID
app.get("/book/:id", async (req, res) => {
    try {
        await connectDB();
        const id = req.params.id;
        const result = await booksCollections.findOne({ _id: new ObjectId(id) });
        if (!result) return res.status(404).send("Not found");
        res.send(result);
    } catch (err) { res.status(400).send("Invalid ID"); }
});

// GET LIVE STATS
app.get("/site-stats", async (req, res) => {
    await connectDB();
    const stats = await countersCollection.findOne({ name: "globalStats" });
    res.send(stats);
});

// GET ALL STORIES
app.get("/all-stories", async (req, res) => {
    await connectDB();
    const result = await storiesCollection.find().sort({ createdAt: -1 }).toArray();
    res.send(result);
});

// GET COMMENTS
app.get("/comments/:bookId", async (req, res) => {
    await connectDB();
    const bId = req.params.bookId.trim();
    const result = await commentsCollection.find({ bookId: bId }).sort({ createdAt: -1 }).toArray();
    res.send(result);
});

// POST routes like /upload-books will need Cloudinary to work on Vercel.
// For now, I'm omitting the local Multer logic to prevent the 500 crash.

// Handle local running
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
