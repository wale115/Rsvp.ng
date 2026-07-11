"use client";
import { useState } from "react";
import { Plus, X, ImagePlus } from "lucide-react";
import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import type { StoryChapter } from "@/lib/story";

export default function StoryEditor({
  name,
  initialChapters = [],
}: {
  name: string;
  initialChapters?: StoryChapter[];
}) {
  const [chapters, setChapters] = useState<StoryChapter[]>(initialChapters);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const supabase = createClient();

  function addChapter() {
    setChapters((prev) => [...prev, { id: nanoid(6), title: "", text: "" }]);
  }

  function updateChapter(id: string, field: "title" | "text", value: string) {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function removeChapter(id: string) {
    setChapters((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleImage(id: string, file: File | null) {
    if (!file) return;
    setUploadingId(id);
    const ext = file.name.split(".").pop();
    const path = `${nanoid(10)}.${ext}`;
    const { error } = await supabase.storage
      .from("event-images")
      .upload(path, file, { upsert: false });
    if (!error) {
      const { data } = supabase.storage.from("event-images").getPublicUrl(path);
      setChapters((prev) =>
        prev.map((c) => (c.id === id ? { ...c, image: data.publicUrl } : c))
      );
    }
    setUploadingId(null);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(chapters)} />
      <label className="text-sm text-text-secondary block">Your Story (optional)</label>

      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="border border-gray-200 rounded-xl p-3 space-y-2 bg-white"
        >
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={chapter.title}
                onChange={(e) => updateChapter(chapter.id, "title", e.target.value)}
                placeholder="e.g. How We Met"
                className="w-full text-sm font-medium border-none focus:outline-none bg-transparent"
              />
              <textarea
                value={chapter.text}
                onChange={(e) => updateChapter(chapter.id, "text", e.target.value)}
                placeholder="Tell this part of the story…"
                rows={3}
                className="w-full text-sm border-none focus:outline-none resize-none bg-transparent"
              />
            </div>
            <button
              type="button"
              onClick={() => removeChapter(chapter.id)}
              className="text-red-400 shrink-0 hover:text-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {chapter.image ? (
            <div className="relative w-20 h-20">
              <Image
                src={chapter.image}
                alt=""
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() =>
                  setChapters((prev) =>
                    prev.map((c) =>
                      c.id === chapter.id ? { ...c, image: undefined } : c
                    )
                  )
                }
                className="absolute -top-1.5 -right-1.5 bg-black/60 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center leading-none"
              >
                ×
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-1.5 text-xs text-brand cursor-pointer w-fit">
              <ImagePlus size={14} />
              {uploadingId === chapter.id ? "Uploading…" : "Add photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImage(chapter.id, e.target.files?.[0] ?? null)}
              />
            </label>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addChapter}
        className="flex items-center gap-1.5 text-sm text-brand font-medium"
      >
        <Plus size={16} /> Add a chapter
      </button>
    </div>
  );
}
