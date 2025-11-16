import { useState } from "react";
import { addExperience } from "../services/api";

export default function AddExperience() {
  const [form, setForm] = useState({ name: "", company: "", role: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addExperience(form);
      alert("Experience Added Successfully");
      console.log(res.data);
    } catch (err) {
      alert("Error adding experience");
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Experience</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Company"
          className="border p-2 rounded"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          type="text"
          placeholder="Role"
          className="border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}