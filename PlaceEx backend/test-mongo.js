import mongoose from "mongoose";

async function test() {
  try {
    console.log("Connecting...");
    await mongoose.connect("mongodb://localhost:27017/placeex");
    console.log("✅ MongoDB Connected Successfully!");
    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
  }
}

test();
