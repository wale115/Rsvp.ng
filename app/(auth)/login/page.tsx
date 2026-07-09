"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push("/dashboard");
    else alert(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
        <div className="flex justify-center mb-2">
          <Logo withTagline />
        </div>
        <h1 className="text-2xl font-bold text-center">Log in</h1>
        <input
          className="border p-3 w-full rounded-xl"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-3 w-full rounded-xl"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-brand hover:bg-[#5A3AE0] text-white p-3 w-full rounded-xl transition-colors">Log in</button>
        <a href="/signup" className="block text-center text-sm text-gray-500">
          Need an account? Sign up
        </a>
      </form>
    </div>
  );
}
