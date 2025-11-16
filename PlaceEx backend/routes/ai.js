// routes/ai.js
import express from "express";

const router = express.Router();

const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-2.5-flash-preview-09-2025";

// POST /api/ai/generate
router.post("/generate", async (req, res) => {
  try {
    const userText = req.body.text;
    if (!userText) {
      return res.status(400).json({ error: "Missing text" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const body = {
      contents: [{ parts: [{ text: userText }] }],
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("Gemini API error:", errText);
      return res.status(r.status).send(errText);
    }

    const json = await r.json();
    const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

    return res.json({ reply, raw: json });
  } catch (err) {
    console.error("AI proxy error:", err);
    return res.status(500).json({ error: "AI proxy failed" });
  }
});

export default router;
