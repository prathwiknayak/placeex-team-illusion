import express from "express";
import multer from "multer";
import fs from "fs";
import { extractTextFromPdf } from "../utils/pdf.js"; // you can use pdf-parse or similar
const router = express.Router();
const upload = multer({ dest: process.env.UPLOAD_DIR || "./uploads" });

router.post("/scan", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    // extract text (use pdf-parse, or just read plain text for .txt)
    const text = await extractTextFromPdf(filePath); // implement using pdf-parse
    // basic scoring rules:
    let score = 0;
    const reasons = [];

    // CGPA rule (example: search "CGPA" and value)
    const cgpaMatch = text.match(/(\d\.\d{1,2})/);
    if (cgpaMatch && parseFloat(cgpaMatch[1]) >= 8) {
      score += 4;
    } else {
      reasons.push("CGPA below 8");
    }

    // keywords
    const keywords = [
      "mini project",
      "internship",
      "hackathon",
      "Japan",
      "Germany",
      "Japanese",
    ];
    let kwCount = 0;
    for (const kw of keywords)
      if (text.toLowerCase().includes(kw.toLowerCase())) kwCount++;
    score += Math.min(4, kwCount); // up to +4

    // final normalisation to 0-10
    score = Math.min(10, Math.round(score));
    const pass = score >= 5;

    res.json({
      pass,
      score,
      reasons,
      tips: pass
        ? []
        : [
            "Add internship details",
            "Highlight projects",
            "Include Japan/Germany intent",
          ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
