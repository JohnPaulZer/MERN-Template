// Libraries
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// Stores
import { useAuthStore } from "@/stores/auth/auth.store";
import { useTokenStore } from "@/stores/token/token.store";

export default function LogoutBtn() {
  const loading = useAuthStore((s) => s.loading);
  const logout = useAuthStore((s) => s.logout);
  const setClearToken = useTokenStore((s) => s.setClearToken);

  const navigate = useNavigate();

  const submitLogout = async () => {
    const success = await logout();
    if (success) {
      setClearToken();
      navigate("/auth/login", { replace: true });
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      disabled={loading}
      onClick={submitLogout}
      className="
        flex items-center gap-2
        px-4 py-2 rounded-xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        text-rose-400 font-medium
        hover:bg-white/10
        transition-all duration-200
        cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-4 w-4 border-2 border-rose-400 border-t-transparent rounded-full"
        />
      ) : (
        <FiLogOut className="text-lg" />
      )}

      <span className="hidden sm:inline">
        {loading ? "Signing out..." : "Logout"}
      </span>
    </motion.button>
  );
}
