"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Music, X } from "lucide-react";

export default function AudioUploader({
  name,
  initialUrl = "",
}: {
  name: string;
  initialUrl?: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  async function handleFile(file: File | null) {
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${nanoid(10)}.${ext}`;

    const { error } = await supabase.storage
      .from("event-audio")
      .upload(path, file, { upsert: false });

    if (!error) {
      const { data } = supabase.storage.from("event-audio").getPublicUrl(path);
      setUrl(data.publicUrl);
    }

    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />
      <label className="text-sm text-text-secondary block">Background Music (optional)</label>

      {url ? (
        <div className="flex items-center justify-between border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-2 text-sm text-ink">
            <Music size={16} className="text-brand" />
            Audio uploaded
          </div>
          <button type="button" onClick={() => setUrl("")} className="text-red-500">
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="block border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-brand transition-colors">
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <span className="text-sm text-text-secondary">
            {uploading ? "Uploading…" : "Click to upload a song (MP3)"}
          </span>
        </label>
      )}
    </div>
  );
}
