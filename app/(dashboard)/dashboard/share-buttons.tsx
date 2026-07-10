"use client";
import { useState } from "react";

export default function ShareButtons({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/e/${slug}` : "";

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      const text = encodeURIComponent(`You're invited! ${url}`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  }

  return (
    <div className="flex gap-2 mt-2">
      <button onClick={handleCopy} className="text-xs border px-2 py-1 rounded hover:bg-gray-50">
        {copied ? "Copied!" : "Copy Link"}
      </button>
      <button onClick={handleWhatsApp} className="text-xs border px-2 py-1 rounded hover:bg-gray-50">
        Share on WhatsApp
      </button>
    </div>
  );
}
