// server/ai.js
import express from "express";
const router = express.Router();

const MODEL = "gemini-2.5-flash-preview-09-2025";

router.post("/generate", async (req, res) => {
  try {
    const text = req.body?.text;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey)
      return res.status(500).json({ error: "Server missing API key" });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text }] }],
      // include systemInstruction if you want the behavior in your HTML
      systemInstruction: { parts: [{ text: req.body.systemPrompt || "" }] },
      // other options can be added as needed
    };

    const r = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await r.json();

    if (!r.ok) {
      console.error("Gemini error", r.status, json);
      return res.status(r.status).json({ error: json });
    }

    // Extract best candidate text and grounding sources if present
    const candidate = json?.candidates?.[0];
    const reply = candidate?.content?.parts?.[0]?.text ?? "";
    const grounding = candidate?.groundingAttributions ?? null;

    return res.json({ reply, grounding, raw: json });
  } catch (err) {
    console.error("AI proxy error:", err);
    return res.status(500).json({ error: "AI proxy failed" });
  }
});

export default router;
