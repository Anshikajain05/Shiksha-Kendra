const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());

// Create 'uploads' folder if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const uri = "mongodb+srv://book-store:asl9znRKPPxu69an@cluster0.dsdvlc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: { 
        version: ServerApiVersion.v1, 
        strict: true, 
        deprecationErrors: true 
    }
});

async function run() {
    try {
        await client.connect();
        const db = client.db("BookInventory");
        
        // Collections
        const booksCollections = db.collection("books");
        const commentsCollection = db.collection("comments");
        const storiesCollection = db.collection("stories"); 
        const countersCollection = db.collection("siteStats");

        console.log("✅ Database Connected Successfully!");

        // --- INITIALIZE COUNTERS ---
        async function initStats() {
            const stats = await countersCollection.findOne({ name: "globalStats" });
            if (!stats) {
                await countersCollection.insertOne({ 
                    name: "globalStats", 
                    resourceAvailable: 500, 
                    resourceCount: 200 
                });
                console.log("📊 Stats Initialized: 500 Resources / 200 Downloads");
            }
        }
        await initStats();

        // --- 1. BOOK ROUTES ---

        // UPLOAD NEW RESOURCE
        app.post("/upload-books", upload.single("bookFile"), async (req, res) => {
            try {
                const data = req.body;
                if (req.file) {
                    data.bookPDFURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                }
                const result = await booksCollections.insertOne(data);

                // Increment Total Resources available
                await countersCollection.updateOne(
                    { name: "globalStats" },
                    { $inc: { resourceAvailable: 1 } }
                );

                res.status(201).send(result);
            } catch (error) {
                res.status(500).send({ message: "Upload failed", error: error.message });
            }
        });

        // GET ALL RESOURCES
        app.get("/all-books", async (req, res) => {
            const result = await booksCollections.find().toArray();
            res.send(result);
        });

        // GET SINGLE RESOURCE BY ID
        app.get("/book/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const result = await booksCollections.findOne({ _id: new ObjectId(id) });
                if (!result) return res.status(404).send("Not found");
                res.send(result);
            } catch (err) { res.status(400).send("Invalid ID"); }
        });

        // UPDATE RESOURCE (PATCH)
        app.patch("/book/:id", upload.single("bookFile"), async (req, res) => {
            try {
                const id = req.params.id;
                const updateData = req.body;

                if (req.file) {
                    updateData.bookPDFURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                }

                const filter = { _id: new ObjectId(id) };
                const updatedDoc = { $set: { ...updateData } };

                const result = await booksCollections.updateOne(filter, updatedDoc);
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Update failed", error: error.message });
            }
        });

        // DELETE RESOURCE
        // DELETE RESOURCE
app.delete("/book/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Attempting to delete ID:", id); // Check your terminal for this!
        
        const result = await booksCollections.deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 1) {
            res.status(200).send({ message: "Deleted successfully", deletedCount: 1 });
        } else {
            res.status(404).send({ message: "No document found with that ID" });
        }
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).send({ message: "Delete failed", error: error.message });
    }
});

        // --- 2. STATS & TRACKING ---

        // TRACK DOWNLOADS
        app.post("/track-download", async (req, res) => {
            try {
                const result = await countersCollection.updateOne(
                    { name: "globalStats" },
                    { $inc: { resourceCount: 1 } }
                );
                res.status(200).send({ success: true });
            } catch (error) {
                res.status(500).send(error);
            }
        });

        // GET LIVE STATS
        app.get("/site-stats", async (req, res) => {
            const stats = await countersCollection.findOne({ name: "globalStats" });
            res.send(stats);
        });

        // --- 3. INSPIRING STORIES ---
        app.post("/add-story", async (req, res) => {
            try {
                const storyData = { ...req.body, createdAt: new Date() };
                const result = await storiesCollection.insertOne(storyData);
                res.status(201).send(result);
            } catch (error) { res.status(500).send("Story error"); }
        });

        app.get("/all-stories", async (req, res) => {
            const result = await storiesCollection.find().sort({ createdAt: -1 }).toArray();
            res.send(result);
        });

        // --- 4. COMMENTS ---
        app.post("/add-comment", async (req, res) => {
            try {
                const comment = { ...req.body, createdAt: new Date() };
                const result = await commentsCollection.insertOne(comment);
                res.status(201).send(result);
            } catch (error) { res.status(500).send("Comment error"); }
        });

        app.get("/comments/:bookId", async (req, res) => {
            const bId = req.params.bookId.trim();
            const result = await commentsCollection.find({ bookId: bId }).sort({ createdAt: -1 }).toArray();
            res.send(result);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
}

run().catch(console.dir);

app.get('/', (req, res) => res.send('Shiksha Kendra Server Running'));
module.exports = app
// app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
