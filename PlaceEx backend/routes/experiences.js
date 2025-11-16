import express from "express";
import multer from "multer";
import auth from "../middlewares/auth.js";
import Experience from "../models/Experience.js";
import fs from "fs";
import path from "path";

const router = express.Router();
const uploadDir = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// create experience (with optional resume + files)
router.post(
  "/",
  auth,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "files", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const ownerId = req.userId;
      const body = req.body;
      const resume = req.files?.resume?.[0]?.path;
      const files = (req.files?.files || []).map((f) => f.path);
      const exp = new Experience({
        ...body,
        userId: ownerId,
        resume,
        files,
        ownerEmail: body.ownerEmail,
      });
      await exp.save();
      res.json(exp);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// list experiences with filters
router.get("/", async (req, res) => {
  const { company, branch, role, skills } = req.query;
  const q = {};
  if (company) q.company = new RegExp(company, "i");
  if (branch) q.branch = branch;
  if (role) q.role = role;
  if (skills) q.skills = { $all: skills.split(",").map((s) => s.trim()) };
  const exps = await Experience.find(q).sort({ createdAt: -1 }).limit(200);
  res.json(exps);
});

// update / delete and owner check
router.put("/:id", auth, async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) return res.status(404).end();
  if (String(exp.userId) !== req.userId)
    return res.status(403).json({ msg: "Not owner" });
  Object.assign(exp, req.body);
  await exp.save();
  res.json(exp);
});

router.delete("/:id", auth, async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) return res.status(404).end();
  if (String(exp.userId) !== req.userId)
    return res.status(403).json({ msg: "Not owner" });
  await exp.delete();
  res.json({ ok: true });
});

export default router;
