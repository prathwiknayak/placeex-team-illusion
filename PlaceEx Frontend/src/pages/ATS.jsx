// src/pages/ATS.jsx
import { useState } from "react";
import { scanResume } from "../utils/atsRules";

const SAMPLE = `Education
B.Tech in Computer Science | CGPA: 8.4

Projects
Mini Projects: Built a React Todo app; DSA visualizer.

Experience
Internship: 8 weeks at ABC Tech, built a Node.js API.
Hackathons: Winner - Smart India Hackathon college round.

Skills
Data Structures, React, Node.js

Languages & Certifications
JLPT N5 (Japanese)
`;

export default function ATS() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    // Client-only: support .txt for now
    if (file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt")) {
      const content = await file.text();
      setText(content);
      setResult(null);
    } else {
      alert("Please upload a .txt file for now. (PDF/DOC coming when backend is ready)");
    }
    e.target.value = ""; // reset
  }

  function runScan() {
    const raw = text.trim();
    if (!raw) {
      alert("Paste your resume text or upload a .txt file first.");
      return;
    }
    setLoading(true);
    try {
      const res = scanResume(raw);
      setResult(res);
      setCopied(false);
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setText("");
    setResult(null);
    setFileName("");
    setCopied(false);
  }

  async function copyReport() {
    if (!result) return;
    const report = buildReport(text, result);
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Could not copy. You can select the text manually.");
    }
  }

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">ATS Scanner</h1>
        <p className="opacity-80">
          Rules: <b>CGPA ≥ 8</b>, include <b>mini projects</b>, <b>internship</b>, <b>hackathon(s)</b>, and
          mention <b>Japanese language / JLPT (N5–N1)</b> for Japan placements.
        </p>
      </header>

      {/* Upload + Paste */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-3">Upload</h2>
          <input
            type="file"
            accept=".txt"
            onChange={handleFile}
            className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:bg-white/60 dark:file:bg-white/20 hover:file:opacity-90"
          />
          {fileName && <p className="text-xs opacity-70 mt-2">Loaded: {fileName}</p>}
          <div className="mt-3 text-sm opacity-80">
            PDF/DOC parsing will be enabled after backend. For now, upload <b>.txt</b> or paste text.
          </div>
          <button
            onClick={() => { setText(SAMPLE); setResult(null); setFileName("sample.txt"); }}
            className="mt-4 w-full px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Paste Sample Resume
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Paste Resume Text</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            placeholder="Paste the full text of your resume here…"
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={runScan}
              disabled={loading}
              className="bg-brand text-gray-900 font-semibold px-4 py-2 rounded-xl hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Scanning…" : "Scan"}
            </button>
            <button
              onClick={resetAll}
              className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Reset
            </button>
            
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 space-y-5">
          {/* Pass/Fail */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-semibold">Result</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                result.pass
                  ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
              }`}
            >
              {result.pass ? "Pass" : "Fail"}
            </span>
          </div>

          {/* Overall Score */}
          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm opacity-80">Overall Score</div>
              <div className="text-sm font-semibold">
                {result.score} / {result.maxScore}
              </div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${(result.score / result.maxScore) * 100}%`,
                  backgroundColor: "#00FFFF",
                }}
              />
            </div>
          </div>

          {/* Reasons */}
          {result.reasons.length > 0 && (
            <section>
              <h3 className="font-semibold mb-2">Reasons</h3>
              <ul className="list-disc pl-6 space-y-1">
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Tips */}
          {result.tips.length > 0 && (
            <section>
              <h3 className="font-semibold mb-2">Tips</h3>
              <ul className="list-disc pl-6 space-y-1">
                {result.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function buildReport(inputText, result) {
  const lines = [];
  lines.push("PlaceEx ATS Report");
  lines.push("====================================");
  lines.push("");
  lines.push(`Pass/Fail: ${result.pass ? "Pass" : "Fail"}`);
  lines.push(`Score: ${result.score} / ${result.maxScore}`);
  lines.push("");
  if (result.reasons.length > 0) {
    lines.push("Reasons:");
    for (const r of result.reasons) lines.push(`- ${r}`);
    lines.push("");
  }
  if (result.tips.length > 0) {
    lines.push("Tips:");
    for (const t of result.tips) lines.push(`- ${t}`);
    lines.push("");
  }
  lines.push("----");
  lines.push("Scanned text (first 300 chars):");
  lines.push((inputText || "").slice(0, 300));
  return lines.join("\n");
}
