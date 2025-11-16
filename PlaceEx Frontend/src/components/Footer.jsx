/* src/components/Footer.jsx */
import { Link } from "react-router-dom";

const team = [
  { name: "Prithvi Shetty",  linkedin: "https://www.linkedin.com/in/prithvi-shetty-27069331b" },
  { name: "Puneeth P Acharya", linkedin: "https://www.linkedin.com/in/puneeth-p-acharya-583068378" },
  { name: "Pranav Wagle",    linkedin: "https://www.linkedin.com/in/pranav-s-nayak-02803a375" },
  { name: "Prathwik Nayak",  linkedin: "https://www.linkedin.com/in/prathwik-c-nayak-7150b4362" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={[
        // FULL-BLEED BLOCK
        "w-full",
        // HEIGHT (MEDIUM): adjust these two for size → py-* and min-h-*
        "py-8 min-h-[240px]",           // ← change to py-16 / min-h-[360px] for L, or py-8 / min-h-[240px] for S
        // COLORS (dark block in both themes, slightly darker in dark mode)
        "bg-gray-900 text-gray-100 dark:bg-slate-950",
      ].join(" ")}
    >
      {/* Center content but keep background full width */}
      <div className="mx-auto max-w-screen-2xl px-6">
        {/* Top row: brand + quick blurb */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {/* Accent bar in brand color */}
            <span className="inline-block h-8 w-1 rounded-full" />
            <span className="text-3xl font-bold tracking-wide">PlaceEx</span>
          

           
          </div>
         </div>
        {/* Middle: grid sections */}
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {/* Team */}
          <div>
            <div className="text-sm font-semibold text-gray-200">Team</div>
            <ul className="mt-3 space-y-3">
              {team.map((t) => (
                <li key={t.name} className="flex items-center gap-3">
                  <span className="text-sm">{t.name}</span>
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-white/15 px-2 py-1 text-xs text-gray-200 hover:bg-white/10"
                    title="LinkedIn"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Map */}
          <div>
            <div className="text-sm font-semibold text-gray-200">Site Map</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li><Link className="hover:underline" to="/">Homepage</Link></li>
              <li><Link className="hover:underline" to="/dashboard">Dashboard</Link></li>
              <li><Link className="hover:underline" to="/experience">Experience</Link></li>
              <li><Link className="hover:underline" to="/companies">Companies</Link></li>
              <li><Link className="hover:underline" to="/ats">ATS</Link></li>
              <li><Link className="hover:underline" to="/ai">AI Assistant</Link></li>
             
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-sm font-semibold text-gray-200">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li><a className="hover:underline" href="#">Privacy Policy</a></li>
              <li><a className="hover:underline" href="#">Terms of Service</a></li>
              <li><a className="hover:underline" href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-gray-400">
          © {year} PlaceEx. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* Tiny inline icon (no extra libs) */
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4v16h-4zM8.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 2-2.88 4V24h-4z"/>
    </svg>
  );
}
