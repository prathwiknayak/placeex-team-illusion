// server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-2.5-flash-preview-09-2025";

app.post("/api/ai/generate", async (req, res) => {
  try {
    // we now forward the FULL payload from frontend to Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body), // <-- forward full body
    });

    const text = await r.text();
    return res.status(r.status).send(text); // return raw Gemini JSON as-is
  } catch (err) {
    console.error("AI proxy error:", err);
    return res.status(500).json({ error: "AI proxy failed" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("AI proxy listening on", process.env.PORT || 4000);
});
