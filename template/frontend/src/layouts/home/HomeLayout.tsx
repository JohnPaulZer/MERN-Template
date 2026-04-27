import Header from "@/components/header/Header";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

export default function HomeLayout() {
  const location = useLocation();

  return (
    <div className="h-dvh w-dvw bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
