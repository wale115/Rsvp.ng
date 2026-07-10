"use client";
import { useState } from "react";
import { submitRSVP } from "@/actions/guest";

export default function RSVPForm({ experienceId, accent }: { experienceId: string; accent?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"going" | "maybe" | "declined">("going");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await submitRSVP(experienceId, name, phone, status, email);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
  }

  const accentColor = accent || "#6C47FF";

  if (submitted) {
    return <p style={{ color: accentColor }} className="font-medium">Thanks — your RSVP is in! 🎉</p>;
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
      <input
        className="border p-3 w-full rounded-xl"
        type="email"
        placeholder="Email (optional — for confirmation)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        disabled={loading}
        className="text-white p-3 w-full rounded-xl font-medium transition-colors disabled:opacity-60"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? "Submitting…" : "Submit RSVP"}
      </button>
    </form>
  );
}
