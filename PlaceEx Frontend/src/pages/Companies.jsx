import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Companies() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("experiences") || "[]");
      setList(Array.isArray(data) ? data : []);
    } catch {
      setList([]);
    }
  }, []);

  const companies = useMemo(() => {
    const map = new Map();
    for (const e of list) {
      const name = (e.company || "Unknown").trim();
      if (!name) continue;
      map.set(name, (map.get(name) || 0) + 1);
    }
    let arr = [...map.entries()].map(([name, count]) => ({ name, count }));
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      arr = arr.filter((c) => c.name.toLowerCase().includes(s));
    }
    arr.sort((a, b) => (b.count - a.count) || a.name.localeCompare(b.name));
    return arr;
  }, [list, q]);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-3xl font-bold">Companies</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search company…"
          className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {companies.length === 0 ? (
        <p className="opacity-70">
          {q.trim()
            ? "No companies match your search."
            : "No companies yet. Ask seniors to add experiences!"}
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {companies.map((c) => (
            <Link
              key={c.name}
              to={`/companies/${encodeURIComponent(c.name)}`}
              className="p-4 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div className="text-lg font-semibold">{c.name}</div>
              <div className="text-sm opacity-70 mt-1">
                {c.count} experience{c.count > 1 ? "s" : ""}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
