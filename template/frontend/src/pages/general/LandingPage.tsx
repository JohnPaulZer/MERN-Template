import { motion } from "framer-motion";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="relative h-dvh w-dvw flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-indigo-500/20 blur-[120px] rounded-full -top-40 -left-40" />
      <div className="absolute w-100 h-100 bg-purple-500/20 blur-[120px] rounded-full -bottom-40 -right-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-8 text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Welcome to{" "}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Secure Auth Template
          </span>
        </h1>

        <p className="text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed">
          A clean, scalable authentication architecture using JWT access &
          refresh tokens, secure cookie storage, centralized Axios interceptors,
          protected route guards, and resilient session handling — built for
          modern MERN applications.
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            to="/auth/register"
            className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:bg-indigo-600 transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Link>

          <Link
            to="/auth/login"
            className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
