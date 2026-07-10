import Link from "next/link";
import { Logo } from "@/components/logo";
import { Check } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left branded panel — hidden on mobile */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-brand to-[#4A2FE0] p-10 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/10" />

        <Link href="/" className="relative z-10 text-xl font-bold">
          Rsvp<span className="text-white/70">.ng</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold leading-snug">
            Every Event.
            <br />
            Perfectly Shared.
          </h2>
          <ul className="space-y-3 text-sm text-white/90">
            {[
              "Beautiful, animated invitations",
              "Real-time RSVP tracking",
              "Share anywhere — WhatsApp and beyond",
              "Free forever, no credit card needed",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/60">© 2026 Rsvp.ng</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-16 bg-surface">
        <div className="md:hidden flex justify-center mb-8">
          <Logo withTagline />
        </div>
        <div className="max-w-sm w-full mx-auto">{children}</div>
      </div>
    </div>
  );
}
