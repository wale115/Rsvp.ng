"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (!error) router.push("/dashboard");
    else setError(error.message);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-ink mb-1">Create your account</h1>
        <p className="text-sm text-text-secondary">Start hosting beautiful events for free.</p>
      </div>
      <div>
        <label className="text-sm text-text-secondary mb-1 block">Email</label>
        <input
          className="border border-gray-200 p-3 w-full rounded-xl"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm text-text-secondary mb-1 block">Password</label>
        <input
          className="border border-gray-200 p-3 w-full rounded-xl"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        disabled={loading}
        className="bg-brand hover:bg-[#5A3AE0] text-white p-3 w-full rounded-xl font-medium transition-colors disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Sign up"}
      </button>
      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-brand font-medium">
          Log in
        </Link>
      </p>
    </form>
  );
}
