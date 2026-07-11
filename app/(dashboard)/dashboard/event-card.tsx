"use client";
import Link from "next/link";
import { Share2, Pencil, Users, Trash2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { deleteExperience } from "@/actions/experience";

interface Counts {
  going: number;
  maybe: number;
  declined: number;
  total: number;
}

export default function EventCard({
  id,
  slug,
  title,
  status,
  counts,
}: {
  id: string;
  slug: string;
  title: string;
  status: string;
  counts: Counts;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const url = `${window.location.origin}/e/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleWhatsApp() {
    const url = `${window.location.origin}/e/${slug}`;
    const text = encodeURIComponent(`You're invited! ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  async function handleDelete() {
    if (confirm("Delete this event? This cannot be undone.")) {
      await deleteExperience(id);
    }
  }

  return (
    <div className="bg-white border border-gray-100 radius-md p-5 space-y-4 shadow-subtle">
      {/* Header */}
      <Link href={`/e/${slug}`} className="block">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="font-semibold text-lg text-ink leading-snug">{title}</h3>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-brand-light text-brand capitalize font-medium">
              {status}
            </span>
          </div>
          <div className="text-right shrink-0">
            <p className="font-semibold text-brand">{counts.total}</p>
            <p className="text-xs text-text-muted">{counts.total === 1 ? "response" : "responses"}</p>
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {counts.going} going · {counts.maybe} maybe · {counts.declined} declined
        </p>
      </Link>

      {/* Primary actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 text-sm font-medium border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy Link"}
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-1.5 text-sm font-medium border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* Secondary actions */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <Link href={`/dashboard/${id}/edit`} className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Pencil size={15} />
          Edit
        </Link>
        <Link href={`/dashboard/${id}/guests`} className="flex items-center gap-1.5 text-sm text-brand font-medium">
          <Users size={15} />
          Guests
        </Link>
        <button onClick={handleDelete} className="flex items-center gap-1.5 text-sm text-red-600">
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </div>
  );
}
