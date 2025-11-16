import { createContext, useContext, useMemo, useState } from "react";

const ExperiencesContext = createContext(null);
export const useExperiences = () => useContext(ExperiencesContext);

const SEED = [
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
    links: ["https://leetcode.com"],
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
];

export function ExperiencesProvider({ children }) {
  // Single source of truth for the whole app (no localStorage)
  const [experiences, setExperiences] = useState(SEED);

  // CRUD helpers (these are what pages will call)
  const addExperience = (exp) => {
    setExperiences((prev) => [{ id: Date.now(), ...exp }, ...prev]);
  };

  const updateExperience = (updated) => {
    setExperiences((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteExperience = (id) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  // Derived helpers
  const getById = (id) => experiences.find((e) => String(e.id) === String(id));

  const value = useMemo(
    () => ({
      experiences,
      addExperience,
      updateExperience,
      deleteExperience,
      getById,
    }),
    [experiences]
  );

  return (
    <ExperiencesContext.Provider value={value}>
      {children}
    </ExperiencesContext.Provider>
  );
}
