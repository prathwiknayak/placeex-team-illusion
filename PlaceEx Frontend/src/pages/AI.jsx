// src/pages/ChatAI.jsx
import { useEffect, useRef, useState } from "react";

const systemPrompt = `Act as a dedicated, hyper-focused Placement and Career Counselor. Your sole purpose is to provide advice...`; // shorten or reuse your full prompt

export default function ChatAI() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your dedicated PlaceEx Assistant. How can I help?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  function scrollBottom() {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiBase}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, systemPrompt }),
      });
      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn't generate a reply.";
      setMessages((m) => [...m, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { sender: "bot", text: "Error contacting AI. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col border rounded-xl overflow-hidden">
      <header className="p-4 bg-white border-b">PlaceEx Assistant</header>

      {/* messages */}
      <main ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`${m.sender === "user" ? "bg-cyan-100 text-black" : "bg-white border"} p-3 rounded-2xl max-w-[85%]`}>
              <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Generating...</div>}
      </main>

      {/* input */}
      <footer className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask your PlaceEx Assistant..."
            className="flex-1 p-3 rounded-2xl border"
          />
          <button onClick={sendMessage} disabled={loading} className="px-4 py-2 bg-cyan-400 rounded-2xl">
            {loading ? "..." : "Send"}
          </button>
        </div>
      </footer>
    </div>
  );
}
