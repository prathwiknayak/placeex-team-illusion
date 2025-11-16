// src/utils/atsRules.js
export function scanResume(rawText = "") {
  const text = (rawText || "").toLowerCase();

  const result = {
    pass: true,
    reasons: [],
    tips: [],
    checks: {
      cgpa: null,
      hasMiniProjects: false,
      hasInternship: false,
      hasHackathon: false,
      knowsJapanese: false,
    },
    // scoring
    score: 0,
    maxScore: 10,
    scoreBreakdown: {
      cgpa: 0, // /4
      miniProjects: 0, // /2
      internship: 0, // /2
      hackathon: 0, // /1
      japanese: 0, // /1
    },
  };

  // --- CGPA extraction (matches "CGPA: 8.2", "cgpa 8", "CGPA-8.5")
  const cgpaMatch = text.match(/cgpa[^0-9]*([0-9]+(?:\.[0-9]+)?)/i);
  const cgpa = cgpaMatch ? parseFloat(cgpaMatch[1]) : null;
  result.checks.cgpa = Number.isFinite(cgpa) ? cgpa : null;

  // CGPA rule (hard rule for pass/fail)
  if (cgpa == null || cgpa < 8) {
    result.pass = false;
    result.reasons.push("CGPA is missing or below 8.");
    result.tips.push("Add CGPA ≥ 8 and write it clearly (e.g., “CGPA: 8.0”).");
  }

  // CGPA score (/4): scale 8.0 → 0, 10.0 → 4
  if (cgpa != null && cgpa >= 8) {
    const scaled = Math.min(Math.max((cgpa - 8) / 2, 0), 1); // 0..1
    result.scoreBreakdown.cgpa = round1(4 * scaled);
  }

  // --- Required keywords
  const hasMiniProjects =
    text.includes("mini project") || text.includes("mini projects");
  const hasInternship =
    text.includes("internship") || text.includes("internships");
  const hasHackathon =
    text.includes("hackathon") || text.includes("hackathons");

  result.checks.hasMiniProjects = hasMiniProjects;
  result.checks.hasInternship = hasInternship;
  result.checks.hasHackathon = hasHackathon;

  const missing = [];
  if (!hasMiniProjects) missing.push("mini projects");
  if (!hasInternship) missing.push("internships");
  if (!hasHackathon) missing.push("hackathons");

  if (missing.length) {
    result.pass = false;
    result.reasons.push(`Missing: ${missing.join(", ")}.`);
    result.tips.push(
      "Include mini projects, internships, and hackathon achievements to improve ATS score."
    );
  }

  // Scores for keywords
  if (hasMiniProjects) result.scoreBreakdown.miniProjects = 2; // /2
  if (hasInternship) result.scoreBreakdown.internship = 2; // /2
  if (hasHackathon) result.scoreBreakdown.hackathon = 1; // /1

  // --- Japanese language rule (for Japan placements)
  const knowsJapanese =
    text.includes("japanese") ||
    text.includes("jlpt") ||
    text.includes("n5") ||
    text.includes("n4") ||
    text.includes("n3") ||
    text.includes("n2") ||
    text.includes("n1") ||
    text.includes("日本語");

  result.checks.knowsJapanese = knowsJapanese;

  if (!knowsJapanese) {
    result.pass = false;
    result.reasons.push("Japanese language proficiency not found.");
    result.tips.push(
      "For Japan placements, mention Japanese language skills or JLPT certification (e.g., JLPT N5–N1)."
    );
  } else {
    result.scoreBreakdown.japanese = 1; // /1
  }

  // Total score
  result.score =
    result.scoreBreakdown.cgpa +
    result.scoreBreakdown.miniProjects +
    result.scoreBreakdown.internship +
    result.scoreBreakdown.hackathon +
    result.scoreBreakdown.japanese;

  result.score = round1(result.score);
  result.tips = [...new Set(result.tips)];
  return result;
}

function round1(n) {
  return Math.round(n * 10) / 10;
}
