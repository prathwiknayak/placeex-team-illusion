import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

export default function ExperienceDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { state } = useLocation(); // { exp } if passed from Link
  const passedExp = state?.exp;

  const [localExp, setLocalExp] = useState(null);

  // Try localStorage as a fallback (works if you later enable persistence)
  useEffect(() => {
    if (passedExp) return; // we already have it
    try {
      const list = JSON.parse(localStorage.getItem("experiences") || "[]");
      const found = Array.isArray(list)
        ? list.find(e => String(e.id) === String(id))
        : null;
      setLocalExp(found || null);
    } catch {
      setLocalExp(null);
    }
  }, [id, passedExp]);

  const exp = useMemo(() => passedExp || localExp, [passedExp, localExp]);

  if (!exp) {
    // Graceful empty state if neither router state nor localStorage has it
    return (
      <div className="px-6 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Experience</h1>
          <button
            onClick={() => nav(-1)}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ← Back
          </button>
        </div>
        <div className="p-4 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800">
          <p className="opacity-80">
            Full details aren’t available on this route because the entry wasn’t
            passed in navigation and there’s no saved data yet.
          </p>
          <p className="mt-2 text-sm">
            Go back and open from the list, or visit{" "}
            <Link to="/experience" className="text-brand font-semibold">Experience</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{exp.name}</h1>
        <button
          onClick={() => nav(-1)}
          className="px-4 py-2 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ← Back
        </button>
      </div>

      <article className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow">
        <div className="flex items-center gap-4">
          <img src={exp.img} alt={exp.name} className="w-16 h-16 rounded-full border" />
          <div>
            <div className="text-lg font-semibold">{exp.company} • {exp.role}</div>
            <div className="text-sm opacity-80">{exp.branch} • {exp.ctc || "—"}</div>
            {exp.linkedin && (
              <a href={exp.linkedin} target="_blank" className="text-brand font-semibold hover:opacity-80">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {exp.summary && <p className="mt-4 leading-relaxed">{exp.summary}</p>}

        {exp.skills?.length > 0 && (
          <div className="mt-4">
            <div className="font-semibold mb-2">Skills</div>
            <div className="flex flex-wrap gap-2">
              {exp.skills.map((s, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-lg border dark:border-gray-600">{s}</span>
              ))}
            </div>
          </div>
        )}

        {exp.links?.length > 0 && (
          <div className="mt-4">
            <div className="font-semibold mb-2">Links</div>
            <div className="flex flex-wrap gap-2">
              {exp.links.map((url, i) => (
                <a key={i} href={url} target="_blank"
                   className="text-xs px-2 py-1 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700">
                  Link {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-sm opacity-70">
          {exp.resume ? "Resume attached • " : ""}
          {exp.files?.length ? `${exp.files.length} file(s) attached` : ""}
        </div>
      </article>
    </div>
  );
}
