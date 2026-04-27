// Libraries
import { motion } from "framer-motion";
import { useState, type ChangeEvent, type SubmitEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
// Types
import type { AccountType } from "@/types/account/account.type";
// Stores
import { useAuthStore } from "@/stores/auth/auth.store";
import { useTokenStore } from "@/stores/token/token.store";
// Components
import CustomInput from "../../../components/input/CustomInput";
import BackToLandingPage from "@/components/general/BackToLandingPage";

export default function LoginPage() {
  const loading = useAuthStore((s) => s.loading);
  const setLogin = useAuthStore((s) => s.setLogin);
  const setToken = useTokenStore((s) => s.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<AccountType>>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm: SubmitEventHandler = async (e) => {
    e.preventDefault();
    const success = await setLogin(form);
    if (success && typeof success === "string") {
      setToken(success);
      navigate("/home");
    }
  };

  return (
    <div className="relative h-dvh w-dvw flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden px-6">
      {/* Background glow */}
      <div className="absolute w-100 h-100 bg-indigo-500/20 blur-[120px] rounded-full -top-40 -left-40" />
      <div className="absolute w-87.5 h-87.5 bg-purple-500/20 blur-[120px] rounded-full -bottom-40 -right-40" />

      <BackToLandingPage />

      <motion.form
        onSubmit={submitForm}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-10 flex flex-col gap-6 shadow-2xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-300 text-sm mt-1">
            Sign in to continue to your account
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <CustomInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />

          <CustomInput
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="text-center text-sm text-slate-300">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Register here
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
