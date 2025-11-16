import { useEffect } from "react";

export default function ChatWidget() {
  // Close on ESC (kept for safety if you re-enable the panel later)
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        // nothing to close since we redirect on click
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Replace this with your friend's AI URL
  const FRIEND_AI_URL = "https://team-illusion-qglz3wkc1-prathwikc1607-5446s-projects.vercel.app";

  // If you want to pass token (optional), uncomment below and use finalUrl
  // const token = localStorage.getItem("placeex_token");
  // const finalUrl = token ? `${FRIEND_AI_URL}?token=${encodeURIComponent(token)}` : FRIEND_AI_URL;

  return (
    <>
      {/* Floating button — now redirects same tab */}
      <button
        onClick={() => {
          // same-tab redirect
          window.location.href = FRIEND_AI_URL;
          // or for token: window.location.href = finalUrl;
        }}
        className="fixed bottom-6 right-6 z-[60] group rounded-full shadow-xl px-4 h-12 flex items-center gap-2 bg-brand text-slate-900"
        aria-label="Open chat"
        type="button"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z"></path>
        </svg>
        <span className="hidden sm:inline font-semibold">Chat</span>

        <span className="absolute -top-9 right-0 hidden group-hover:block text-xs px-2 py-1 rounded-md bg-black/80 text-white">
          PlaceEx Assistant
        </span>
      </button>
    </>
  );
}
