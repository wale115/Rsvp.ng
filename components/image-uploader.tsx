"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";

export default function ImageUploader({
  name,
  initialUrls = [],
  multiple = true,
}: {
  name: string;
  initialUrls?: string[];
  multiple?: boolean;
}) {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${nanoid(10)}.${ext}`;

      const { error } = await supabase.storage.from("event-images").upload(path, file, { upsert: false });

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage.from("event-images").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setUrls((prev) => (multiple ? [...prev, ...uploaded] : uploaded.slice(0, 1)));
    setUploading(false);
  }

  function removeImage(url: string) {
    setUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={urls.join(",")} />

      <label className="block border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-brand transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="text-sm text-text-secondary">
          {uploading ? "Uploading…" : multiple ? "Click to upload photos" : "Click to upload cover photo"}
        </span>
      </label>

      {urls.length > 0 && (
        <div className={multiple ? "grid grid-cols-3 gap-2" : "grid grid-cols-1"}>
          {urls.map((url) => (
            <div key={url} className="relative group">
              <Image
                src={url}
                alt=""
                width={200}
                height={multiple ? 80 : 160}
                className={multiple ? "w-full h-20 object-cover rounded-lg" : "w-full h-40 object-cover rounded-lg"}
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
