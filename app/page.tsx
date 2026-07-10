import Link from "next/link";
import { Logo } from "@/components/logo";
import { Calendar, Share2, Users, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-text-secondary">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-brand hover:bg-[#5A3AE0] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-20">
        <p className="inline-block bg-brand-light text-brand text-xs font-medium px-3 py-1 rounded-full mb-4">
          The Smart Way to Plan &amp; Share Your Events
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-ink leading-tight mb-4">
          Beautiful Events <br />
          Start <span className="text-pink">Here</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
          Create stunning event experiences, collect RSVPs, and share every detail in one beautiful link.
        </p>
        <div className="flex justify-center gap-3 mb-4">
          <Link
            href="/signup"
            className="bg-brand hover:bg-[#5A3AE0] text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Create Your Event →
          </Link>
        </div>
        <p className="text-xs text-text-muted">No credit card required · Free forever</p>
      </section>

      {/* Trusted by */}
      <section className="max-w-4xl mx-auto px-6 py-10 border-t border-gray-100">
        <p className="text-center text-sm text-text-muted mb-6">Perfect for every occasion</p>
        <div className="flex flex-wrap justify-center gap-8 text-text-secondary text-sm">
          <span>Weddings</span>
          <span>Birthdays</span>
          <span>Conferences</span>
          <span>Church Events</span>
          <span>Parties</span>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ink mb-10">
          Everything You Need to Make Every Event Unforgettable
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Calendar, title: "Beautiful Pages", desc: "Elegant, animated invitations for any occasion." },
            { icon: Users, title: "Guest Management", desc: "Collect RSVPs and track responses in real-time." },
            { icon: Share2, title: "Share Anywhere", desc: "One link, shareable on WhatsApp and beyond." },
            { icon: Smartphone, title: "Mobile Friendly", desc: "A smooth experience on every device." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
              <f.icon className="mx-auto mb-3 text-brand" size={28} />
              <h3 className="font-semibold text-ink mb-1">{f.title}</h3>
              <p className="text-sm text-text-secondary">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ink mb-10">How Rsvp.ng Works</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { step: "1", title: "Create Your Event", desc: "Add your event details in minutes." },
            { step: "2", title: "Add Your Story", desc: "Photos, story, and everything guests need." },
            { step: "3", title: "Share Your Link", desc: "Send it anywhere — WhatsApp, email, anywhere." },
            { step: "4", title: "Manage RSVPs", desc: "Track responses and stay organized." },
          ].map((s) => (
            <div key={s.step}>
              <div className="w-10 h-10 rounded-full bg-brand-light text-brand font-bold flex items-center justify-center mx-auto mb-3">
                {s.step}
              </div>
              <h3 className="font-semibold text-ink mb-1">{s.title}</h3>
              <p className="text-sm text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-10">
        <div className="max-w-4xl mx-auto bg-brand rounded-3xl px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to create your unforgettable event?
          </h2>
          <p className="text-white/80 mb-6">Join hosts across Nigeria. It&apos;s free to get started.</p>
          <Link
            href="/signup"
            className="inline-block bg-white text-brand font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />
        <p className="text-xs text-text-muted">© 2026 Rsvp.ng. All rights reserved.</p>
      </footer>
    </div>
  );
}
