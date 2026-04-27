import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="relative h-dvh w-dvw flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden px-6">
      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-indigo-500/20 blur-[120px] rounded-full -top-40 -left-40" />
      <div className="absolute w-100 h-100 bg-purple-500/20 blur-[120px] rounded-full -bottom-40 -right-40" />

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-10 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl font-bold text-white tracking-tight"
          >
            Loading
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              …
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-sm text-slate-300"
          >
            Checking your session
          </motion.p>

          {/* Progress bar */}
          <div className="mt-6 w-full">
            <div className="h-2 w-full rounded-full bg-white/10 border border-white/10 overflow-hidden">
              <motion.div
                className="h-full w-1/2 rounded-full bg-white/25"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Tiny pulse dots */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-2 text-slate-300"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/80" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
