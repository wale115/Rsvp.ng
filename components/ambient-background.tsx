"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function AmbientBackground({ accent }: { accent: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: accent, top: "-10%", left: "-10%" }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: accent, bottom: "-10%", right: "-5%" }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
