"use client";
import { motion } from "framer-motion";
import ThemeDecor from "@/components/theme-decor";

export default function AnimatedCard({
  children,
  surface,
  cardStyle,
  accent,
  decor,
  motionConfig,
}: {
  children: React.ReactNode;
  surface: string;
  cardStyle: "rounded" | "sharp";
  accent: string;
  decor: string;
  motionConfig: { cardDuration: number; cardEase: [number, number, number, number] };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: motionConfig.cardDuration, ease: motionConfig.cardEase }}
      className={`max-w-lg w-full text-center space-y-7 p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.08)] relative z-10 overflow-hidden ${
        cardStyle === "sharp" ? "rounded-none" : "rounded-[28px]"
      }`}
      style={{ backgroundColor: surface }}
    >
      <ThemeDecor decor={decor} accent={accent} />
      <div className="relative z-10 space-y-7">{children}</div>
    </motion.div>
  );
}
