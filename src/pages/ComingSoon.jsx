import React from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,150,255,0.35),_transparent_60%)]"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Planet / Arc effect */}
        <div className="relative w-60 h-60 mb-8">
          <div className="absolute inset-0 rounded-full border border-white/10"></div>
          <div className="absolute inset-0 rounded-full shadow-[0_-20px_80px_rgba(120,150,255,0.6)]"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-b from-blue-400/40 to-transparent"></div>
        </div>

        {/* Small text */}
        <p className="text-xs tracking-[0.4em] text-gray-400 mb-3 uppercase">
          Our Website is under construction
        </p>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[0.3em] text-white mb-8">
          COMING SOON
        </h1>

        {/* Loader bar */}
        <div className="w-56 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="h-full w-1/2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
