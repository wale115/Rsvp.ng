"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ParallaxCover({ src }: { src: string }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  if (shouldReduceMotion) {
    return (
      <Image
        src={src}
        alt=""
        width={600}
        height={300}
        className="w-full h-56 object-cover rounded-2xl -mt-4 mb-2"
        priority
      />
    );
  }

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl -mt-4 mb-2 h-56">
      <motion.div style={{ y }} className="h-[130%] -mt-4">
        <Image
          src={src}
          alt=""
          width={600}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </motion.div>
    </div>
  );
}
