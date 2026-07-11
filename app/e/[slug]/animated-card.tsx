"use client";
import { motion } from "framer-motion";

export default function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-lg w-full text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl relative z-10"
    >
      {children}
    </motion.div>
  );
}
