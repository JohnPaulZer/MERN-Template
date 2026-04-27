import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh w-dvw flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden px-6">
      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-indigo-500/20 blur-[120px] rounded-full -top-40 -left-40" />
      <div className="absolute w-100 h-100 bg-purple-500/20 blur-[120px] rounded-full -bottom-40 -right-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        {/* 404 Title */}
        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-slate-200">
          Page Not Found
        </h2>

        <p className="text-slate-400 max-w-md leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          Please check the URL or go back to a safe location.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:bg-indigo-600 transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
