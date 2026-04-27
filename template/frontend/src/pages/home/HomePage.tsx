import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-44 -left-44 h-130 w-130 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-44 -right-44 h-110 w-110 rounded-full bg-purple-500/20 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col px-4 py-10 sm:px-6 sm:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-2xl text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Secure Authentication
          </h1>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-8 flex w-full flex-1 items-center justify-center"
        >
          <div
            className="
              w-full max-w-4xl
              rounded-2xl border border-white/15
              bg-white/10 p-5 shadow-2xl backdrop-blur-xl
              sm:p-7
            "
          >
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {/* Left: quick overview */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Session Overview
                </h2>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  This page is protected and accessible only after
                  authentication. Requests automatically include authorization
                  and recover gracefully when access tokens expire.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200 sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Session Active
                </div>
              </div>

              {/* Right: features */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Security Features
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-200 sm:text-base">
                  <Feature dot="bg-indigo-400">
                    Protected Routes (Frontend + Backend)
                  </Feature>
                  <Feature dot="bg-purple-400">
                    JWT Access & Refresh Token Flow
                  </Feature>
                  <Feature dot="bg-indigo-400">
                    HTTP-only Secure Cookie Storage
                  </Feature>
                  <Feature dot="bg-purple-400">Automatic Token Renewal</Feature>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Feature({
  children,
  dot,
}: {
  children: React.ReactNode;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-2 w-2 rounded-full ${dot}`} />
      <span>{children}</span>
    </div>
  );
}
