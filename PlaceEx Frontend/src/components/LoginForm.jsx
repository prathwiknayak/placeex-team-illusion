import { useState } from "react";
import { saveToken } from "../utils/auth"; // adjust path if needed

export default function LoginForm({ onSignup, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validEmail = () => /\S+@\S+\.\S+/.test(email);
  const validPassword = () => password.length >= 6;

  const shakeField = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("shake", "ring-2", "ring-red-400");
    setTimeout(() => el.classList.remove("shake", "ring-2", "ring-red-400"), 400);
    el.focus();
  };

  // IMPORTANT: form submit handled here to prevent navigation
  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    console.log("[Login] handleSubmit called", { email });

    setSubmitted(true);
    if (!validEmail()) {
      console.log("[Login] invalid email");
      return shakeField("login-email");
    }
    if (!validPassword()) {
      console.log("[Login] invalid password");
      return shakeField("login-password");
    }

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
      const url = `${apiBase}/auth/login`;
      console.log("[Login] POST", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      console.log("[Login] response status", res.status);
      let data = {};
      try { data = await res.json(); console.log("[Login] response json", data); }
      catch (e) { console.warn("[Login] response not JSON", e); }

      if (!res.ok) {
        // Show friendly message, don't navigate away
        const msg = data.msg || data.error || data.message || `Login failed (status ${res.status})`;
        alert(msg);
        return;
      }

      if (!data.token) {
        alert("Login successful but server did not return a token.");
        return;
      }

      // SUCCESS: save token and call onSuccess
      saveToken(data.token);
      localStorage.setItem("userEmail", email.trim().toLowerCase());
      console.log("[Login] token saved");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("[Login] network error", err);
      alert("Network error — is your backend running at http://localhost:4000 ?");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => alert("Google Login (UI only) — backend later.");

  return (
    // Use a real form and handle submit to avoid accidental navigation
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 rounded-xl backdrop-blur-sm border 
            ${submitted && !validEmail() ? "border-red-500" : "border-white/30"} 
            bg-white/40 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand`}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2 rounded-xl backdrop-blur-sm border 
            ${submitted && !validPassword() ? "border-red-500" : "border-white/30"} 
            bg-white/40 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand`}
        />
      </div>

      {/* Login Button (type="submit" so it triggers onSubmit handler) */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-xl bg-brand font-semibold text-gray-900 hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* OR */}
      <div className="flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-white/30" />
        <span className="text-xs opacity-70">OR</span>
        <div className="h-[1px] flex-1 bg-white/30" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={googleLogin}
        className="w-full py-2 rounded-xl bg-white/70 dark:bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/90 dark:hover:bg-white/30 transition text-gray-800 dark:text-gray-100 font-medium"
      >
        Continue with Google
      </button>

      {/* Switch to Signup */}
      <p className="text-sm text-center opacity-80">
        Don't have an Account?{" "}
        <span onClick={onSignup} className="text-brand font-semibold cursor-pointer hover:opacity-80">
          Register
        </span>
      </p>
    </form>
  );
}
