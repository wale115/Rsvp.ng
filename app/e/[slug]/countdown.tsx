"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, reduceMotion }: { value: number; reduceMotion: boolean }) {
  const display = String(value).padStart(2, "0");

  if (reduceMotion) {
    return <span>{display}</span>;
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={display}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="inline-block"
      >
        {display}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Countdown({
  date,
  accent,
  accentLight,
}: {
  date: string;
  accent: string;
  accentLight: string;
}) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | undefined>(undefined);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Set immediately on mount (client-only) so server and client agree on
    // the first render (both produce nothing), then the interval takes over.
    setTimeLeft(getTimeLeft(date));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(date)), 1000);
    return () => clearInterval(interval);
  }, [date]);

  // undefined = not yet mounted (SSR / before effect runs) → render nothing
  // null      = event has passed → render celebration message
  if (timeLeft === undefined) return null;
  if (timeLeft === null) {
    return <p style={{ color: accent }} className="font-medium">The celebration has begun 🎉</p>;
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="rounded-xl px-3 py-2 min-w-[60px] overflow-hidden"
          style={{ backgroundColor: accentLight }}
        >
          <p className="text-2xl font-bold tabular-nums" style={{ color: accent }}>
            <Digit value={u.value} reduceMotion={!!shouldReduceMotion} />
          </p>
          <p className="text-xs text-text-muted uppercase tracking-wide">{u.label}</p>
        </div>
      ))}
    </div>
  );
}
