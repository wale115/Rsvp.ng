"use client";
import { useState } from "react";

export default function PasswordGate({
  correctPassword,
  children,
}: {
  correctPassword: string;
  children: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === correctPassword) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
      <form onSubmit={handleSubmit} className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-sm space-y-4 text-center">
        <h1 className="text-xl font-bold text-ink">This invitation is private</h1>
        <p className="text-sm text-text-secondary">Enter the password to view this event.</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          className="border p-3 w-full rounded-xl text-center"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm">Incorrect password. Try again.</p>}
        <button className="bg-brand hover:bg-[#5A3AE0] text-white p-3 w-full rounded-xl transition-colors">
          Unlock
        </button>
      </form>
    </div>
  );
}
