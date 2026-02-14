// server/db.js
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("hostel_db");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Export function to get collections
function getCollection(name) {
  if (!db) throw new Error("Database not connected yet!");
  return db.collection(name);
}

module.exports = { connectDB, getCollection };