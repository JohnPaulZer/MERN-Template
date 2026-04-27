import mongoose from "mongoose";

export default async function initDB() {
  try {
    // Enforce strict query filtering (only fields defined in schema are allowed in queries)
    mongoose.set("strictQuery", true);

    // Enforce strict schema mode (ignore fields not defined in schema)
    mongoose.set("strict", true);

    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGO_DB_URI as string);

    // Log successful connection
    console.log("Connected to MongoDB");
  } catch (err) {
    // Log connection error (useful for debugging startup issues)
    console.error("MongoDB connection error:", err);

    // Exit early if connection fails (prevents app from running without DB)
    return;
  }
}
