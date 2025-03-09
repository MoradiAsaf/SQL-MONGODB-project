const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://mongo_db:27017/myDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

// יצירת חיבור למסד הנתונים
const db = new sqlite3.Database(
    path.join(__dirname, "mydatabase.db"),
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            console.error("❌ Database connection error:", err.message);
        } else {
            console.log("✅ Connected to SQLite database");
        }
    }
);

module.exports = { db, connectDB };
