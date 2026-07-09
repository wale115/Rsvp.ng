"use client";
import { useEffect, useState } from "react";

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

export default function Countdown({
  date,
  accent,
  accentLight,
}: {
  date: string;
  accent: string;
  accentLight: string;
}) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(date));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(date)), 1000);
    return () => clearInterval(interval);
  }, [date]);

  if (!timeLeft) {
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
        <div key={u.label} className="rounded-xl px-3 py-2 min-w-[60px]" style={{ backgroundColor: accentLight }}>
          <p className="text-2xl font-bold tabular-nums" style={{ color: accent }}>
            {String(u.value).padStart(2, "0")}
          </p>
          <p className="text-xs text-text-muted uppercase tracking-wide">{u.label}</p>
        </div>
      ))}
    </div>
  );
}
