// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "../routes/auth.js"; // routes folder is at root
import "../db.js"; // db.js is at project root (.. from /server)

dotenv.config();
// --- CONFIG ---
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/placeex";
const MODEL = "gemini-2.5-flash-preview-09-2025";
const API_KEY = process.env.GOOGLE_API_KEY;

const app = express();
// --- MIDDLEWARE ---
app.use(
  cors({
    origin: ["http://localhost:5173"], // Vite dev frontend
    credentials: true,
  })
);

app.use(express.json());

// --- BASIC HEALTH CHECK ---
app.get("/", (req, res) => {
  res.send("PlaceEx backend is running");
});

// --- AUTH ROUTES (LOGIN / SIGNUP) ---
app.use("/api/auth", authRouter);
// => POST /api/auth/signup
// => POST /api/auth/login

// ---------- AI ROUTE ----------
app.post("/api/ai/generate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    // This is the CORRECT body shape for Gemini
    const body = {
      contents: [
        {
          parts: [{ text: text.trim() }],
        },
      ],
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await r.json();

    if (!r.ok) {
      // Forward Google error to client
      return res.status(r.status).json(data);
    }

    // Extract reply text safely
    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("\n") || "";

    return res.json({ reply, raw: data });
  } catch (err) {
    console.error("AI proxy error:", err);
    return res.status(500).json({ error: "AI proxy failed" });
  }
});
// ---------- END AI ROUTE ----------

// --- START SERVER AFTER MONGO CONNECTS ---
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
