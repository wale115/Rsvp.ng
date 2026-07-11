"use client";
import { useState } from "react";
import { submitRSVP } from "@/actions/guest";
import ConfettiBurst from "@/components/confetti-burst";
import HeartsBurst from "@/components/hearts-burst";
import Segmented from "@/components/segmented";
import { FormGroup, FormRow } from "@/components/form-group";

export default function RSVPForm({
  experienceId,
  accent,
  decoration = "none",
}: {
  experienceId: string;
  accent: string;
  decoration?: "none" | "confetti" | "hearts";
}) {
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

  if (submitted) {
    return (
      <div>
        {decoration === "confetti" && status === "going" && <ConfettiBurst accent={accent} />}
        {decoration === "hearts" && status === "going" && <HeartsBurst accent={accent} />}
        <p style={{ color: accent }} className="font-medium">
          Thanks — your RSVP is in! 🎉
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <Segmented
        name="status"
        value={status}
        onChange={setStatus}
        options={[
          { label: "Going", value: "going" },
          { label: "Maybe", value: "maybe" },
          { label: "Can't make it", value: "declined" },
        ]}
      />
      <FormGroup>
        <FormRow label="Your name">
          <input
            placeholder="e.g. Amara Obi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormRow>
        <FormRow label="Phone number">
          <input
            placeholder="+234 800 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </FormRow>
        <FormRow label="Email (optional)">
          <input
            type="email"
            placeholder="for confirmation"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRow>
      </FormGroup>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        disabled={loading}
        className="text-white p-3.5 w-full rounded-2xl font-medium transition-colors disabled:opacity-60 active:scale-[0.98]"
        style={{ backgroundColor: accent }}
      >
        {loading ? "Submitting…" : "Submit RSVP"}
      </button>
    </form>
  );
}
