const { MongoClient } = require('mongodb');
let db;

async function connectDB() {
  if (db) return db; // reuse existing connection

  try {
    let client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(); // if your URI includes db name, this works fine

    console.log("✅ MongoDB connected");

    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

module.exports = connectDB;