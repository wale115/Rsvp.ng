"use client";
import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
  surface,
  cardStyle,
}: {
  children: React.ReactNode;
  surface: string;
  cardStyle: "rounded" | "sharp";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-lg w-full text-center space-y-7 p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.08)] relative z-10 ${
        cardStyle === "sharp" ? "rounded-none" : "rounded-[28px]"
      }`}
      style={{ backgroundColor: surface }}
    >
      {children}
    </motion.div>
  );
}
