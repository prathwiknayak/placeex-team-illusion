// ChatCore.jsx (frontend)
import { useState } from "react";

export default function ChatCore({ height = "60vh" }) {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! Ask me anything." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages(m => [...m, { sender: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      // if backend is on different origin:
      const apiBase = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiBase}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, no reply";
      setMessages(m => [...m, { sender: "bot", text: reply }]);
    } catch (err) {
      setMessages(m => [...m, { sender: "bot", text: "Error contacting AI" }]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height }} className="flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((m,i)=>(
          <div key={i} className={`p-2 rounded-xl max-w-[85%] ${m.sender==="user"?"ml-auto bg-brand":"bg-gray-200 dark:bg-gray-700"}`}>{m.text}</div>
        ))}
      </div>

      <div className="p-2 border-t flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=> e.key==="Enter" && sendMessage()} className="flex-1 px-3 py-2 rounded-xl" placeholder="Type..." />
        <button onClick={sendMessage} className="px-4 py-2 rounded-xl bg-brand">{loading ? "..." : "Send"}</button>
      </div>
    </div>
  );
}
