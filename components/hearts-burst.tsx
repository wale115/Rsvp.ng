"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function HeartsBurst({ accent }: { accent: string }) {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: random(-80, 80),
    delay: random(0, 0.3),
    size: random(14, 22),
  }));

  return (
    <div className="relative w-full h-0 pointer-events-none">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ opacity: 1, x: h.x, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -140, scale: 1 }}
          transition={{ duration: 1.4, delay: h.delay, ease: "easeOut" }}
          className="absolute left-1/2 top-0"
        >
          <Heart size={h.size} fill={accent} color={accent} />
        </motion.span>
      ))}
    </div>
  );
}
