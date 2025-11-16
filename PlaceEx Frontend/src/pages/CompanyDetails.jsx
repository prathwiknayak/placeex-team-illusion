import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BRANCHES = ["CSE", "ISE", "AIML", "ECE", "EEE", "MECH", "CIVIL"];
const ROLES = ["SDE", "Frontend", "Backend", "Full-Stack", "Data Engineer", "ML Engineer", "DevOps"];

export default function CompanyDetails() {
  const { companyName } = useParams();
  const decoded = decodeURIComponent(companyName || "");
  const [all, setAll] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("experiences") || "[]");
      setAll(Array.isArray(data) ? data : []);
    } catch {
      setAll([]);
    }
  }, []);

  const [branch, setBranch] = useState("");
  const [role, setRole] = useState("");

  const filtered = useMemo(() => {
    return all.filter((e) => {
      const sameCompany = (e.company || "").toLowerCase() === decoded.toLowerCase();
      if (!sameCompany) return false;
      const okBranch = !branch || e.branch === branch;
      const okRole = !role || e.role === role;
      return okBranch && okRole;
    });
  }, [all, decoded, branch, role]);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{decoded}</h1>
        <Link
          to="/companies"
          className="px-4 py-2 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ← Back
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col md:flex-row gap-3">
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <option value="">Branch (All)</option>
          {BRANCHES.map((b) => <option key={b}>{b}</option>)}
        </select>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <option value="">Role (All)</option>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
        {(branch || role) && (
          <button
            onClick={() => { setBranch(""); setRole(""); }}
            className="px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700 ml-auto"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="opacity-70">No experiences match these filters.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((exp) => (
            <article
              key={exp.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg space-y-2"
            >
              <div className="flex items-center gap-3">
                <img src={exp.img} alt={exp.name} className="w-12 h-12 rounded-full border" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{exp.name}</h2>
                    {exp.linkedin && (
                      <a href={exp.linkedin} target="_blank" className="text-brand font-semibold hover:opacity-80">
                        LinkedIn
                      </a>
                    )}
                  </div>
                  <div className="text-sm opacity-80">{exp.branch} • {exp.role} • {exp.ctc || "—"}</div>
                </div>
              </div>

              {exp.summary && (
                <p className="text-sm leading-relaxed mt-2 line-clamp-3">{exp.summary}</p>
              )}

              {exp.skills?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {exp.skills.map((sk, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600">
                      {sk}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3">
                <Link
                          to={`/experience/${exp.id}`}
                          state={{exp}}
                  className="inline-block px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  View full
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
