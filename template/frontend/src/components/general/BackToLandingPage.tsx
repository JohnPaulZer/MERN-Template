import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BackToLandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-4 md:top-6 left-4 md:left-6 z-20"
    >
      <Link
        to="/"
        className="text-slate-300 text-sm hover:text-white transition-colors duration-200"
      >
        ← Back
      </Link>
    </motion.div>
  );
};

export default BackToLandingPage;
