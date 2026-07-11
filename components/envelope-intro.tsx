"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function EnvelopeIntro({
  initials,
  accent,
  onOpen,
}: {
  initials: string;
  accent: string;
  onOpen?: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleOpen() {
    setOpened(true);
    onOpen?.();
  }

  if (shouldReduceMotion) {
    return null; // skip straight to content for reduced-motion users
  }

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: accent }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-56 h-40 mx-auto mb-8"
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-white/95 rounded-lg shadow-2xl" />
              {/* Envelope flap */}
              <motion.div
                animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
                className="absolute top-0 left-0 right-0 h-20 origin-top"
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />
              </motion.div>
              {/* Monogram */}
              <div className="absolute inset-0 flex items-center justify-center pt-6">
                <span
                  className="text-3xl tracking-widest"
                  style={{ fontFamily: "var(--font-playfair, serif)", color: accent }}
                >
                  {initials}
                </span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleOpen}
              className="text-white text-sm font-medium tracking-widest uppercase border border-white/60 rounded-full px-8 py-3 hover:bg-white/10 transition-colors"
            >
              Tap to Open
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
