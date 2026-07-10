"use client";
import { motion } from "framer-motion";

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ConfettiBurst({ accent }: { accent: string }) {
  const colors = [accent, "#FF9A49", "#FF5FAE", "#8EA6FF", "#16A34A"];
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: random(-160, 160),
    y: random(-220, -60),
    rotate: random(0, 360),
    color: colors[i % colors.length],
    delay: random(0, 0.15),
  }));

  return (
    <div className="relative w-full h-0 pointer-events-none">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate, scale: 0.6 }}
          transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
          className="absolute left-1/2 top-0 w-2 h-2 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}
