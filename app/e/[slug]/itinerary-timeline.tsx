"use client";
import { motion, useReducedMotion } from "framer-motion";
import { itineraryIcons, ItineraryItem } from "@/lib/itinerary-icons";

export default function ItineraryTimeline({
  items,
  accent,
  accentLight,
}: {
  items: ItineraryItem[];
  accent: string;
  accentLight: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (!items || items.length === 0) return null;

  return (
    <div className="text-left">
      <h2 className="text-sm uppercase tracking-wide text-text-muted mb-4">Itinerary</h2>
      <div className="relative pl-8">
        {/* Dashed connecting line */}
        <div
          className="absolute left-[15px] top-2 bottom-2 border-l-2 border-dashed"
          style={{ borderColor: accentLight }}
        />
        <div className="space-y-5">
          {items.map((item, i) => {
            const IconComponent =
              itineraryIcons[item.icon]?.icon ?? itineraryIcons.ceremony.icon;
            return (
              <motion.div
                key={i}
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: -10 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex items-start gap-3"
              >
                {/* Icon bubble */}
                <div
                  className="absolute -left-8 w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: accentLight }}
                >
                  <IconComponent size={15} style={{ color: accent }} />
                </div>
                <div>
                  {item.time && (
                    <p className="text-xs font-semibold" style={{ color: accent }}>
                      {item.time}
                    </p>
                  )}
                  <p className="text-sm text-text-secondary">{item.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
