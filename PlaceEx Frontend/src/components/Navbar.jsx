import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.png";
import profile from "../assets/1.png";

export default function Navbar() {
 
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Link base styles
  const linkClasses = ({ isActive }) =>
    [
      "transition-colors",
      isActive
        ? "text-[#00FFFF] font-semibold"
        : "hover:text-[#00FFFF] opacity-90",
    ].join(" ");

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      {/* Top row: logo + profile */}
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-10 w-10 rounded -full" /> 

          <span className="inline-block h-8 w-1 rounded-lg" />
          <span className="text-3xl font-bold">PlaceEx</span>
        </Link>

        {/* Right: Profile menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 rounded-full bg-gray-300 dark:bg-slate-700 flex items-center justify-center font-bold"
            aria-label="Profile menu"
          >
             <img src={profile} alt="Logo" className="h-10 w-10 rounded -full" /> 
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-xl p-2">
              {/* Login */}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom row: Nav links */}
      <div className="px-6 pb-3">
        <div className="flex flex-wrap justify-center gap-6 text-2xl :text-base font-semibold">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
          <NavLink to="/experience" className={linkClasses}>Experience</NavLink>
          <NavLink to="/companies" className={linkClasses}>Companies</NavLink>
          <NavLink to="/ats" className={linkClasses}>ATS</NavLink>
          {/* AI Model — redirect same tab to friend's AI */}
<button
  onClick={() => {
    // replace with your friend's AI URL
    window.location.href ="https://team-illusion-qglz3wkc1-prathwikc1607-5446s-projects.vercel.app";
  }}
  className="hover:text-brand text-2xl font-semibold"
  type="button"
>
  AI Model
</button>

        </div>
      </div>
    </nav>
  );
}
