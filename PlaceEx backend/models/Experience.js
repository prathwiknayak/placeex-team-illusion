import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  branch: String,
  company: String,
  ctc: String,
  role: String,
  skills: [String],
  linkedin: String,
  summary: String,
  links: [String],
  resume: String, // path to resume file or URL
  files: [String], // reference file paths
  ownerEmail: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Experience", ExperienceSchema);
