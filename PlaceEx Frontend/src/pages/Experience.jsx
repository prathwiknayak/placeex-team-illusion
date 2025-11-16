// src/pages/Experience.jsx
import { useMemo, useState } from "react";
import Modal from "../components/Modal.jsx";

const BRANCHES = ["CSE", "ISE", "AIML", "ECE", "EEE", "MECH", "CIVIL"];
const ROLES = [
  "SDE",
  "Frontend",
  "Backend",
  "Full-Stack",
  "Data Engineer",
  "ML Engineer",
  "DevOps",
];

export default function Experience() {
  // seed data
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      branch: "CSE",
      company: "Google",
      ctc: "45 LPA",
      role: "SDE",
      skills: ["DSA", "System Design", "Graphs"],
      linkedin: "https://linkedin.com",
      img: "https://i.pravatar.cc/100?img=3",
      summary: "System design + DSA rounds. Focus on graphs and DP.",
      links: ["https://leetcode.com", "https://www.youtube.com/watch?v=cpDSvJb"],
      files: [],
      resume: null,
      ownerEmail: null,
    },
    {
      id: 2,
      name: "Sneha Rao",
      branch: "ECE",
      company: "Amazon",
      ctc: "36 LPA",
      role: "Data Engineer",
      skills: ["SQL", "ETL", "BigQuery"],
      linkedin: "https://linkedin.com",
      img: "https://i.pravatar.cc/100?img=5",
      summary: "Bar raiser round was behavioral-heavy. Practice STAR.",
      links: ["https://interviewing.io"],
      files: [],
      resume: null,
      ownerEmail: null,
    },
  {
      id: 2,
      name: "Omkar prabhu",
      branch: "AIML",
      company: "ORACLE",
      ctc: "36 LPA",
      role: "SDE",
      skills: ["Python", "Machine Learning", "Data Structures"],
      linkedin: "https://linkedin.com",
      img: "https://i.pravatar.cc/100?img=9",
      summary: "Focus on Python and ML algorithms. Prepare well for coding rounds.",
      links: ["https://interviewing.io"],
      files: [],
      resume: null,
      ownerEmail: null,
    },
  ]);

  // filters
  const [companyQ, setCompanyQ] = useState("");
  const [branch, setBranch] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const filtered = useMemo(() => {
    const q = companyQ.trim().toLowerCase();
    return experiences.filter((e) => {
      const okCompany = !q || (e.company || "").toLowerCase().includes(q);
      const okBranch = !branch || e.branch === branch;
      const okRole = !role || e.role === role;
      const okSkills =
        skills.length === 0 ||
        skills.every((s) =>
          (e.skills || [])
            .map((x) => String(x).toLowerCase())
            .includes(s.toLowerCase())
        );
      return okCompany && okBranch && okRole && okSkills;
    });
  }, [companyQ, branch, role, skills, experiences]);

  // modal/menu state
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const currentUserEmail = (localStorage.getItem("userEmail") || "").toLowerCase();

  // filter helpers
  const addSkillChip = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (!skills.map((k) => k.toLowerCase()).includes(s.toLowerCase())) {
      setSkills((prev) => [...prev, s]);
    }
    setSkillInput("");
  };
  const removeSkillChip = (s) =>
    setSkills((prev) => prev.filter((x) => x.toLowerCase() !== s.toLowerCase()));
  const clearAllFilters = () => {
    setCompanyQ("");
    setBranch("");
    setRole("");
    setSkills([]);
    setSkillInput("");
  };

  // delete, edit
  const handleDelete = (id) => {
    if (!window.confirm("Delete this experience?")) return;
    setExperiences((prev) => prev.filter((x) => x.id !== id));
  };

  const openEditModal = (exp) => {
    setEditData(exp);
    setOpenEdit(true);
    setMenuOpenId(null);
  };

  const submitEdit = (updated) => {
    setExperiences((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    setOpenEdit(false);
    setEditData(null);
  };

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Title + Add */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Interview Experiences</h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-brand text-gray-900 font-semibold px-4 py-2 rounded-xl hover:opacity-90"
        >
          + Add Experience
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md p-4 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            type="text"
            placeholder="Search company (e.g., Google)"
            value={companyQ}
            onChange={(e) => setCompanyQ(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Branch (All)</option>
            {BRANCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Role (All)</option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a skill and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkillChip();
                }
              }}
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              onClick={addSkillChip}
              className="px-3 py-2 rounded-xl border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600"
              >
                {s}
                <button
                  className="text-xs opacity-70 hover:opacity-100"
                  onClick={() => removeSkillChip(s)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {(companyQ || branch || role || skills.length > 0) && (
          <div className="flex justify-end">
            <button
              onClick={clearAllFilters}
              className="text-sm text-brand font-semibold hover:opacity-80"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Experience Cards */}
      {filtered.length === 0 ? (
        <p className="opacity-70">No experiences match the selected filters.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((exp) => {
            const isOwner = exp.ownerEmail && exp.ownerEmail === currentUserEmail;
            return (
              <article
                key={exp.id}
                className="relative p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex gap-4"
              >
                {/* Owner menu (⋮) */}
                {isOwner && (
                  <div className="absolute right-3 top-3">
                    <button
                      className="px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() =>
                        setMenuOpenId(menuOpenId === exp.id ? null : exp.id)
                      }
                      aria-label="Menu"
                    >
                      ⋮
                    </button>
                    {menuOpenId === exp.id && (
                      <div className="absolute right-0 mt-1 w-36 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                        <button
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => openEditModal(exp)}
                        >
                          ✎ Edit
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => handleDelete(exp.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <img
                  src={exp.img}
                  alt={`${exp.name} avatar`}
                  className="w-16 h-16 rounded-full border"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold">{exp.name}</h2>
                    {exp.linkedin && (
                      <a
                        href={exp.linkedin}
                        target="_blank"
                        className="font-semibold hover:opacity-80"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                  <p className="text-sm opacity-80">
                    {exp.branch} • <span className="font-medium">{exp.company}</span> •{" "}
                    {exp.role}
                  </p>
                  {exp.ctc && <p className="font-medium">{exp.ctc}</p>}
                  {exp.summary && (
                    <p className="text-sm mt-2 leading-relaxed">{exp.summary}</p>
                  )}

                  {exp.skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.skills.map((sk, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}

                  {exp.links?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.links.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          title={url}
                        >
                          Link {i + 1}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 text-xs opacity-70">
                    {exp.resume ? "Resume attached • " : ""}
                    {exp.files?.length ? `${exp.files.length} file(s) attached` : ""}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Add Experience Modal */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <AddExperienceForm
          onCancel={() => setOpenAdd(false)}
          onSubmit={(newExp) => {
            const ownerEmail = (localStorage.getItem("userEmail") || "").toLowerCase();
            setExperiences((prev) => [
              { id: Date.now(), ownerEmail, ...newExp },
              ...prev,
            ]);
            setOpenAdd(false);
          }}
        />
      </Modal>

      {/* Edit Experience Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        {editData && (
          <EditExperienceForm
            data={editData}
            onCancel={() => setOpenEdit(false)}
            onSubmit={(updatedFields) => {
              submitEdit({ ...editData, ...updatedFields });
            }}
          />
        )}
      </Modal>
    </div>
  );
}

/* ---------- Edit Experience Form ---------- */
function EditExperienceForm({ data, onCancel, onSubmit }) {
  const [name, setName] = useState(data?.name || "");
  const [branch, setBranch] = useState(data?.branch || BRANCHES[0]);
  const [company, setCompany] = useState(data?.company || "");
  const [ctc, setCtc] = useState(data?.ctc || "");
  const [linkedin, setLinkedin] = useState(data?.linkedin || "");
  const [summary, setSummary] = useState(data?.summary || "");
  const [role, setRole] = useState(data?.role || ROLES[0]);

  const [skillsText, setSkillsText] = useState("");
  const [skills, setSkills] = useState(Array.isArray(data?.skills) ? data.skills : []);

  const [resume, setResume] = useState(null);
  const [files, setFiles] = useState([]);

  const addSkill = () => {
    const s = skillsText.trim();
    if (!s) return;
    if (!skills.map((k) => k.toLowerCase()).includes(s.toLowerCase())) {
      setSkills((prev) => [...prev, s]);
    }
    setSkillsText("");
  };

  const removeSkill = (s) =>
    setSkills((prev) => prev.filter((x) => x.toLowerCase() !== s.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: data.id,
      name: name.trim(),
      branch,
      company: company.trim(),
      ctc: (ctc || "").toString().trim(),
      role,
      skills,
      linkedin: (linkedin || "").trim(),
      img: data.img,
      summary: (summary || "").trim(),
      links: Array.isArray(data.links) ? data.links : [],
      resume: resume ? resume.name : data.resume || null,
      files: files.length
        ? files.map((f) => f.name)
        : Array.isArray(data.files)
        ? data.files
        : [],
      ownerEmail: data.ownerEmail,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-1">Edit Experience</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
        </div>

        <div>
          <label className="text-sm">Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {BRANCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
        </div>

        <div>
          <label className="text-sm">CTC</label>
          <input
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="e.g., 20 LPA"
          />
        </div>

        <div>
          <label className="text-sm">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">LinkedIn (optional)</label>
          <input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="https://www.linkedin.com/in/…"
          />
        </div>
      </div>

      <div>
        <label className="text-sm">Experience Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Write key rounds, questions, tips, resources…"
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label className="text-sm">Technical Skills</label>
        <div className="flex gap-2">
          <input
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Type a skill and press Enter"
            className="flex-1 px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-3 py-2 rounded-xl border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            + Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600"
            >
              {s}
              <button
                type="button"
                className="text-xs opacity-70 hover:opacity-100"
                onClick={() => removeSkill(s)}
                aria-label="Remove skill"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Optional new files */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Replace Resume (optional)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:bg-white/60 dark:file:bg-white/20 file:hover:opacity-90"
          />
          {data.resume && !resume && (
            <p className="text-xs mt-1 opacity-70">Current: {data.resume}</p>
          )}
          {resume && <p className="text-xs mt-1 opacity-70">New: {resume.name}</p>}
        </div>

        <div>
          <label className="text-sm">Add More Reference Files (optional)</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:bg-white/60 dark:file:bg-white/20 file:hover:opacity-90"
          />
          {Array.isArray(data.files) && data.files.length > 0 && !files.length && (
            <p className="text-xs mt-1 opacity-70">Current: {data.files.length} file(s)</p>
          )}
          {files.length > 0 && (
            <p className="text-xs mt-1 opacity-70">{files.length} new file(s) selected</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-brand font-semibold text-gray-900 hover:opacity-90"
        >
          Save
        </button>
      </div>
    </form>
  );
}

/* ---------- Add Experience Form ---------- */
function AddExperienceForm({ onCancel, onSubmit }) {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [company, setCompany] = useState("");
  const [ctc, setCtc] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [linkedin, setLinkedin] = useState("");
  const [summary, setSummary] = useState("");

  const [skillText, setSkillText] = useState("");
  const [skills, setSkills] = useState([]);

  const [resume, setResume] = useState(null);
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([""]);

  const addSkill = () => {
    const s = skillText.trim();
    if (!s) return;
    if (!skills.map((k) => k.toLowerCase()).includes(s.toLowerCase())) {
      setSkills((prev) => [...prev, s]);
    }
    setSkillText("");
  };
  const removeSkill = (s) =>
    setSkills((prev) => prev.filter((x) => x.toLowerCase() !== s.toLowerCase()));

  const addLink = () => setLinks((arr) => [...arr, ""]);
  const updateLink = (idx, val) =>
    setLinks((arr) => arr.map((v, i) => (i === idx ? val : v)));
  const removeLink = (idx) => setLinks((arr) => arr.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) return;

    onSubmit({
      name: name.trim(),
      branch,
      company: company.trim(),
      ctc: ctc.trim() || "—",
      role,
      skills,
      linkedin: linkedin.trim(),
      img: `https://i.pravatar.cc/100?u=${encodeURIComponent(name + company)}`,
      summary: summary.trim(),
      links: links.map((l) => l.trim()).filter(Boolean),
      resume: resume ? resume.name : null,
      files: files?.map((f) => f.name) || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-1">Add Interview Experience</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
        </div>

        <div>
          <label className="text-sm">Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {BRANCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="e.g., Google"
            required
          />
        </div>

        <div>
          <label className="text-sm">CTC</label>
          <input
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="e.g., 20 LPA"
          />
        </div>

        <div>
          <label className="text-sm">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">LinkedIn (optional)</label>
          <input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="https://www.linkedin.com/in/…"
          />
        </div>
      </div>

      <div>
        <label className="text-sm">Experience Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Write key rounds, questions, tips, resources…"
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label className="text-sm">Technical Skills</label>
        <div className="flex gap-2">
          <input
            value={skillText}
            onChange={(e) => setSkillText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Type a skill and press Enter"
            className="flex-1 px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-3 py-2 rounded-xl border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            + Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600"
            >
              {s}
              <button
                type="button"
                className="text-xs opacity-70 hover:opacity-100"
                onClick={() => removeSkill(s)}
                aria-label="Remove skill"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Files */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Resume (PDF/doc)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:bg-white/60 dark:file:bg-white/20 file:hover:opacity-90"
          />
          {resume && (
            <p className="text-xs mt-1 opacity-70">Selected: {resume.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm">Reference Materials (multiple)</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:bg-white/60 dark:file:bg-white/20 file:hover:opacity-90"
          />
          {files.length > 0 && (
            <p className="text-xs mt-1 opacity-70">
              {files.length} file(s) selected
            </p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <label className="text-sm">Important Links</label>
        {links.map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={l}
              onChange={(e) => updateLink(i, e.target.value)}
              placeholder="https://…"
              className="flex-1 px-3 py-2 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-brand"
            />
            {links.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(i)}
                className="px-3 py-2 rounded-xl border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="text-sm font-semibold hover:opacity-80"
        >
          + Add another link
        </button>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-brand font-semibold text-gray-900 hover:opacity-90"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
