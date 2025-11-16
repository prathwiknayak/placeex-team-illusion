// routes/companies.js
import express from "express";

const router = express.Router();

// Example: list companies
router.get("/", async (req, res) => {
  try {
    // if you have a Company model use:
    // const companies = await Company.find().sort({ name: 1 });
    // else return sample data:
    const companies = [
      { id: 1, name: "Google" },
      { id: 2, name: "Amazon" },
      { id: 3, name: "Netflix" },
    ];
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: add company (protected routes require auth middleware)
router.post("/", async (req, res) => {
  try {
    // implement saving to DB if model exists
    res.status(201).json({ ok: true, company: req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
