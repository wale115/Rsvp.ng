"use client";
import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer({ url, accent }: { url: string; accent: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
  }, []);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay/permission errors are expected on some browsers — silently ignore
      });
    }
    setPlaying(!playing);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} src={url} />
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? "Pause music" : "Play music"}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white"
        style={{ backgroundColor: accent }}
      >
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={
            playing ? { duration: 3, repeat: Infinity, ease: "linear" } : {}
          }
        >
          {playing ? (
            <Pause size={18} fill="white" />
          ) : (
            <Play size={18} fill="white" className="ml-0.5" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
