import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CompanyExperiences() {
  const { name } = useParams();
  const companyName = decodeURIComponent(name || "");
  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("experiences") || "[]");
      setList(Array.isArray(data) ? data : []);
    } catch {
      setList([]);
    }
  }, []);

  const filtered = useMemo(() => {
    return list.filter(
      (e) => (e.company || "").toLowerCase() === companyName.toLowerCase()
    );
  }, [list, companyName]);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{companyName}</h1>
        <Link
          to="/companies"
          className="px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          ← All companies
        </Link>
      </div>

      {filtered.length === 0 ? (
        <p className="opacity-70">No experiences for this company yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((exp) => (
            <article
              key={exp.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex gap-4"
            >
              <img src={exp.img} alt={exp.name} className="w-16 h-16 rounded-full border" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">{exp.name}</h2>
                  {exp.linkedin && (
                    <a
                      href={exp.linkedin}
                      target="_blank"
                      className="text-brand font-semibold hover:opacity-80"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
                <p className="text-sm opacity-80">
                  {exp.branch} • {exp.role}
                </p>
                {exp.ctc && <p className="font-medium">{exp.ctc}</p>}
                {exp.summary && (
                  <p className="text-sm mt-2 leading-relaxed line-clamp-3">
                    {exp.summary}
                  </p>
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
                    className="inline-block px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    View full
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
