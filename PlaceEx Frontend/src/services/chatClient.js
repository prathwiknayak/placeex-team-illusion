// src/services/chatClient.js

// Small helper: safe timeout wrapper for fetch
async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// Main chat function used by ChatCore
export async function sendMessage(message) {
  const text = String(message || "").trim();
  if (!text) return "Please type a message.";

  // Read env config
  const API_URL = import.meta.env.VITE_CHAT_API_URL?.trim();
  const API_TOKEN = import.meta.env.VITE_CHAT_API_TOKEN?.trim();

  // If no backend set -> demo behavior (keeps the app usable today)
  if (!API_URL) {
    const m = text.toLowerCase();
    if (m.includes("ats"))
      return "Open the ATS page and scan your resume. I’ll grade it out of 10 and give tips.";
    if (m.includes("experience"))
      return "Use the Experience page to add/read interview experiences with filters.";
    if (m.includes("company"))
      return "Go to Companies to see experiences grouped by company.";
    return "Demo bot here 🤖 — set VITE_CHAT_API_URL in .env.local to connect the real chatbot.";
  }

  // Real API call (simple REST POST)
  try {
    const body = {
      message: text,
      // You can add more fields your backend needs:
      // userId: localStorage.getItem("userEmail") || "guest",
      // context: "placeex-v1",
    };

    const headers = {
      "Content-Type": "application/json",
    };
    if (API_TOKEN) headers["Authorization"] = `Bearer ${API_TOKEN}`;

    const res = await fetchWithTimeout(
      API_URL,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      },
      20000
    );

    if (!res.ok) {
      const errText = await safeText(res);
      console.warn("Chat API error:", res.status, errText);
      return `The chat server returned ${res.status}. Please try again.`;
    }

    // Expected response shape: { reply: "..." }
    const data = await res.json().catch(() => ({}));
    const reply = (data && (data.reply || data.message || data.text)) || "";
    if (!reply) {
      return "The chat server responded, but I didn’t receive a message.";
    }
    return reply;
  } catch (err) {
    if (err?.name === "AbortError") {
      return "Chat request timed out. Please try again.";
    }
    console.error("Chat API exception:", err);
    return "Couldn’t reach the chat server. Check the URL/CORS and try again.";
  }
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}
