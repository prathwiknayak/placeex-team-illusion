import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div
  className="
    min-h-screen flex items-center justify-center
    bg-slate-50 text-slate-900
    dark:bg-slate-950 dark:text-slate-50
  "
>

           <div className="w-full max-w-md md:max-w-lg rounded-3xl border p-4 shadow-lg bg-white/80 dark:bg-slate-900/90 border-slate-200 dark:border-slate-700 backdrop-blur">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>

        {mode === "login" ? (
          <LoginForm
            onSignup={() => setMode("signup")}
            onSuccess={() => {
              // after successful login, go to dashboard or home
              window.location.href = "/dashboard";
            }}
          />
        ) : (
          <SignupForm
            onLogin={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
}
