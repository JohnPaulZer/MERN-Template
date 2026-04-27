import { motion } from "framer-motion";
import LogoutBtn from "../logout/LogoutBtn";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        w-full
        backdrop-blur-xl
        bg-white/5
        border-b border-white/10
      "
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
            A
          </div>

          <div className="flex flex-col leading-tight">
            <h1 className="text-white font-semibold text-sm sm:text-base">
              Hi, User 👋
            </h1>
            <span className="text-slate-400 text-xs sm:text-sm">
              Welcome back
            </span>
          </div>
        </div>

        {/* Right Section */}
        <LogoutBtn />
      </div>
    </motion.header>
  );
};

export default Header;
