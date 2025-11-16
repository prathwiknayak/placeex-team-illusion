// src/pages/Dashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [experiences, setExperiences] = useState([]);

  // Load experiences from localStorage if available (non-blocking)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("experiences") || "[]");
      if (Array.isArray(saved)) setExperiences(saved);
    } catch {
      setExperiences([]);
    }
  }, []);

  const stats = useMemo(() => {
    const total = experiences.length;
    const uniqueCompanies = new Set(
      experiences.map((e) => (e.company || "").trim()).filter(Boolean)
    ).size;

    // Simple placeholder logic for “students benefited”
    const benefited = total * 10;

    return {
      totalExperiences: total,
      companies: uniqueCompanies,
      studentsBenefited: benefited,
    };
  }, [experiences]);

  const recent = useMemo(() => {
    // newest first if your IDs are Date.now(); else keep order
    const arr = [...experiences].sort((a, b) => (b.id || 0) - (a.id || 0));
    return arr.slice(0, 4);
  }, [experiences]);

  // A tiny, safe fallback list of recruiters (text chips)
  const topRecruiters = useMemo(() => {
    const names = [
      "Google", "Amazon", "Microsoft", "Netflix",
      "NVIDIA", "Oracle", "Adobe", "Uber",
    ];
    return names;
  }, []);

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="opacity-80">
          Quick snapshot of PlaceEx activity — experiences, companies, and actions.
        </p>
      </header>

      {/* KPIs */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Experiences Shared"
          value={stats.totalExperiences}
          note="Total posts by seniors"
        />
        <KpiCard
          title="Companies Covered"
          value={stats.companies}
          note="Unique recruiters"
        />
        <KpiCard
          title="Students Benefited"
          value={stats.studentsBenefited}
          note="Estimated"
        />
      </section>

     

      {/* Recent Experiences */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Experiences</h2>
          <Link to="/experience" className="text-brand font-semibold hover:opacity-80">
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800">
            <p className="opacity-80">
              No experiences yet. Be the first to share your interview experience!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {recent.map((e) => (
              <article
                key={e.id}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={e.img || `https://i.pravatar.cc/100?u=${encodeURIComponent(
                      (e.name || "") + (e.company || "")
                    )}`}
                    alt={e.name || "Senior"}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{e.name || "Senior"}</div>
                    <div className="text-sm opacity-80 truncate">
                      {(e.company || "Company")} • {(e.role || "Role")}
                    </div>
                  </div>
                </div>

                {e.summary && (
                  <p className="mt-3 text-sm line-clamp-3">{e.summary}</p>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs opacity-70">
                    {e.branch || "—"} {e.ctc ? `• ${e.ctc}` : ""}
                  </div>
                  <Link
                    to={`/experience/${e.id}`}
                    state={{ exp: e }}
                    className="text-sm px-3 py-1 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Recruiters */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Popular Recruiters</h2>
        <div className="flex flex-wrap gap-2">
          {topRecruiters.map((n) => (
            <span
              key={n}
              className="text-sm px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            >
              {n}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- Small components ---------- */

function KpiCard({ title, value, note }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
      <div className="text-sm opacity-70">{title}</div>
      <div className="mt-1 text-3xl font-bold">{value}</div>
      {note && <div className="text-xs opacity-70 mt-2">{note}</div>}
      <div className="mt-4 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full"
          style={{
            backgroundColor: "#00FFFF",
            width: "100%",
            opacity: 0.35,
          }}
        />
      </div>
    </div>
  );
}

function ActionCard({ title, desc, to, cta }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex flex-col">
      <div className="text-lg font-semibold">{title}</div>
      <p className="opacity-80 text-sm mt-1 flex-1">{desc}</p>
      <Link
        to={to}
        className="mt-4 self-start bg-brand text-gray-900 font-semibold px-4 py-2 rounded-xl hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  );
}

