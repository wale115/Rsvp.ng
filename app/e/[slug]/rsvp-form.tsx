"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function RSVPForm({ experienceId, accent }: { experienceId: string; accent: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"going" | "maybe" | "declined">("going");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.from("guests").insert({
      experience_id: experienceId,
      name,
      phone,
      status,
    });

    if (error) {
      setError(error.code === "23505" ? "You've already RSVP'd for this event." : error.message);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-green-600 font-medium">Thanks — your RSVP is in! 🎉</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <input
        className="border p-3 w-full rounded-xl"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-3 w-full rounded-xl"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <select
        className="border p-3 w-full rounded-xl"
        value={status}
        onChange={(e) => setStatus(e.target.value as "going" | "maybe" | "declined")}
      >
        <option value="going">Going</option>
        <option value="maybe">Maybe</option>
        <option value="declined">Can&apos;t make it</option>
      </select>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        className="text-white p-3 w-full rounded-xl font-medium transition-colors"
        style={{ backgroundColor: accent }}
      >
        Submit RSVP
      </button>
    </form>
  );
}
