"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseValue(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export default function DateTimePicker({
  name,
  defaultValue = "",
  placeholder = "Select date & time",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const initial = parseValue(defaultValue);
  const [selected, setSelected] = useState<Date | null>(initial);
  const [viewDate, setViewDate] = useState<Date>(initial ?? new Date());
  const [hour12, setHour12] = useState(initial ? (initial.getHours() % 12 || 12) : 6);
  const [minute, setMinute] = useState(initial ? initial.getMinutes() : 0);
  const [ampm, setAmpm] = useState<"AM" | "PM">(initial && initial.getHours() >= 12 ? "PM" : "AM");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const today = new Date();

  function pickDay(day: number) {
    setSelected(new Date(year, month, day));
  }

  function commit() {
    if (!selected) return;
    let h = hour12 % 12;
    if (ampm === "PM") h += 12;
    const finalDate = new Date(selected);
    finalDate.setHours(h, minute, 0, 0);
    setSelected(finalDate);
    setOpen(false);
  }

  function getDisplayDate(): Date | null {
    if (!selected) return null;
    let h = hour12 % 12;
    if (ampm === "PM") h += 12;
    const d = new Date(selected);
    d.setHours(h, minute, 0, 0);
    return d;
  }

  const displayDate = getDisplayDate();
  const displayValue = displayDate
    ? displayDate.toLocaleString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
  const hiddenValue = displayDate ? toLocalValue(displayDate) : "";

  return (
    <div className="relative" ref={containerRef}>
      <input type="hidden" name={name} value={hiddenValue} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full text-left"
      >
        <CalendarIcon size={16} className="text-text-muted shrink-0" />
        <span className={displayValue ? "text-ink" : "text-[#C7C7CC]"}>
          {displayValue || placeholder}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 mt-3 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72"
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                className="p-1.5 hover:bg-gray-50 rounded-lg"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="text-sm font-semibold text-ink">
                {MONTHS[month]} {year}
              </p>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                className="p-1.5 hover:bg-gray-50 rounded-lg"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 mb-1">
              {WEEKDAYS.map((d, i) => (
                <div key={i} className="text-center text-[11px] text-text-muted py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, i) => {
                if (day === null) return <div key={i} />;
                const isSelected =
                  selected &&
                  selected.getFullYear() === year &&
                  selected.getMonth() === month &&
                  selected.getDate() === day;
                const isToday =
                  today.getFullYear() === year &&
                  today.getMonth() === month &&
                  today.getDate() === day;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => pickDay(day)}
                    className={`w-9 h-9 rounded-full text-sm mx-auto flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-brand text-white font-medium"
                        : isToday
                        ? "text-brand font-medium"
                        : "text-ink hover:bg-gray-50"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time selector */}
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <select
                value={hour12}
                onChange={(e) => setHour12(Number(e.target.value))}
                className="bg-gray-50 rounded-lg px-2 py-1.5 text-sm text-ink"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <span className="text-text-muted font-medium">:</span>
              <select
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                className="bg-gray-50 rounded-lg px-2 py-1.5 text-sm text-ink"
              >
                {[0, 15, 30, 45].map((m) => (
                  <option key={m} value={m}>{pad(m)}</option>
                ))}
              </select>
              <div className="flex bg-gray-100 rounded-lg p-0.5 ml-1">
                {(["AM", "PM"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmpm(v)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      ampm === v ? "bg-white text-ink shadow-sm" : "text-text-muted"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={commit}
              disabled={!selected}
              className="w-full mt-4 bg-brand text-white text-sm font-medium py-2.5 rounded-xl disabled:opacity-40 active:scale-[0.98] transition-transform"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
