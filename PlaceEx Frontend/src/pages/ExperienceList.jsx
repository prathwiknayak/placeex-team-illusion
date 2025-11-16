import { useEffect, useState } from "react";
import { getExperiences } from "../services/api";

export default function ExperienceList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    const res = await getExperiences();
    setData(res.data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Experiences</h1>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <p><b>Name:</b> {item.name}</p>
            <p><b>Company:</b> {item.company}</p>
            <p><b>Role:</b> {item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}