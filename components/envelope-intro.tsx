"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Phase = "sealed" | "opening" | "done";

export default function EnvelopeIntro({
  initials,
  accent,
  onOpen,
}: {
  initials: string;
  accent: string;
  onOpen?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("sealed");
  const shouldReduceMotion = useReducedMotion();

  function handleSealClick() {
    setPhase("opening");
    onOpen?.();
  }

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: accent }}
        >
          <div className="relative w-64 h-44" style={{ perspective: "800px" }}>
            {/* Envelope body */}
            <div className="absolute inset-0 bg-white/95 rounded-md shadow-2xl" />

            {/* Card rising from inside */}
            <motion.div
              className="absolute left-1/2 top-6 -translate-x-1/2 w-40 h-24 bg-white rounded-sm shadow-md flex items-center justify-center"
              initial={{ y: 16, opacity: 0 }}
              animate={phase === "opening" ? { y: -26, opacity: 1 } : { y: 16, opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            >
              <span
                className="text-lg tracking-widest"
                style={{ fontFamily: "var(--font-playfair)", color: accent }}
              >
                {initials}
              </span>
            </motion.div>

            {/* Top flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-24 origin-top"
              style={{ transformStyle: "preserve-3d" }}
              animate={phase === "opening" ? { rotateX: 175 } : { rotateX: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.65, 0, 0.35, 1],
                delay: phase === "opening" ? 0.4 : 0,
              }}
              onAnimationComplete={() => {
                if (phase === "opening") setTimeout(() => setPhase("done"), 900);
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.98), rgba(255,255,255,0.85))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            </motion.div>

            {/* Wax seal */}
            <AnimatePresence>
              {phase === "sealed" && (
                <motion.button
                  onClick={handleSealClick}
                  whileTap={{ scale: 0.92 }}
                  exit={{ scale: 1.4, rotate: 20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeIn" }}
                  className="absolute left-1/2 top-[72px] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-10 cursor-pointer"
                  style={{
                    background: `radial-gradient(circle at 32% 28%, ${accent}, #00000055)`,
                  }}
                >
                  <span
                    className="text-white text-[10px] font-semibold tracking-widest"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {initials}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {phase === "sealed" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white text-xs tracking-widest uppercase"
            >
              Tap the seal to open
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
