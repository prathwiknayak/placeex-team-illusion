import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { saveToken } from "../utils/auth";
export default function SignupForm({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Generate random CAPTCHA
  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validation checks
  const validateName = () => name.trim().length > 0;
  const validateEmail = () => /\S+@\S+\.\S+/.test(email);
  const validatePassword = () =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password);
  const validateConfirmPassword = () => password === confirmPass;
  const validateCaptcha = () => captchaInput === captcha;

 const [loading, setLoading] = useState(false);

const handleSignup = async () => {
  setSubmitted(true);

  if (!validateName()) return shakeField("name");
  if (!validateEmail()) return shakeField("email");
  if (!validatePassword()) return shakeField("password");
  if (!validateConfirmPassword()) return shakeField("confirmPass");
  if (!validateCaptcha()) return shakeField("captcha");

  setLoading(true);
  try {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiBase}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // backend may return { msg } or { error }
      const msg = data.msg || data.error || data.message || "Signup failed";
      toast.error(msg);
      setLoading(false);
      return;
    }

    // Success — save token, notify user, redirect to dashboard
    if (data.token) {
      saveToken(data.token);
      toast.success("Account created — welcome!");
      // Option A: redirect to dashboard
      setTimeout(() => (window.location.href = "/dashboard"), 900);
      // Option B (alternate): open login modal instead of redirect
      // setTimeout(() => onLogin && onLogin(), 900);
    } else {
      // if backend doesn't return token, just open login
      toast.success("Account created — please login");
      setTimeout(() => onLogin && onLogin(), 900);
    }
  } catch (err) {
    console.error("Signup error:", err);
    toast.error("Network error — try again");
  } finally {
    setLoading(false);
  }
};


  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setCaptchaInput("");
    generateCaptcha();
    setSubmitted(false);
  };

  // Shake animation
  const shakeField = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add("shake");
      setTimeout(() => field.classList.remove("shake"), 300);
    }
  };

  return (
    <div className="space-y-4">

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 rounded-xl backdrop-blur-sm border 
            ${submitted && !validateName() ? "border-red-500" : "border-white/30"} 
            bg-white/40 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand`}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 rounded-xl backdrop-blur-sm border 
            ${submitted && !validateEmail() ? "border-red-500" : "border-white/30"} 
            bg-white/40 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand`}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Create Password</label>
        <input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2 rounded-xl backdrop-blur-sm border 
            ${submitted && !validatePassword() ? "border-red-500" : "border-white/30"} 
            bg-white/40 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand`}
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Confirm Password</label>
        <input
          id="confirmPass"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className={`w-full px-3 py-2 rounded-xl backdrop-blur-sm border 
            ${submitted && !validateConfirmPassword() ? "border-red-500" : "border-white/30"} 
            bg-white/40 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand`}
        />
      </div>

      {/* CAPTCHA */}
      <div
        id="captcha"
        className={`flex items-center justify-between px-3 py-2 rounded-xl backdrop-blur-sm border 
          ${submitted && !validateCaptcha() ? "border-red-500" : "border-white/30"} 
          bg-white/30 dark:bg-white/10`}
      >
        <span className="font-mono tracking-widest text-lg">{captcha}</span>
        <button
          onClick={generateCaptcha}
          className="text-sm text-brand font-semibold hover:opacity-80"
        >
          Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Enter the above code"
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        className={`w-full px-3 py-2 rounded-xl backdrop-blur-sm border 
          ${submitted && !validateCaptcha() ? "border-red-500" : "border-white/30"} 
          bg-white/40 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand`}
      />

      {/* Signup Button */}
     <button
  onClick={handleSignup}
  disabled={loading}
  className="w-full py-2 rounded-xl bg-brand font-semibold text-gray-900 hover:opacity-90 disabled:opacity-60"
>
  {loading ? "Creating..." : "Sign Up"}
</button>


      {/* Login Redirect */}
      <p className="text-sm text-center opacity-80">
        Already have an account?{" "}
        <span
          onClick={onLogin}
          className="text-brand font-semibold cursor-pointer hover:opacity-80"
        >
          Login
        </span>
      </p>
    </div>
  );
}
