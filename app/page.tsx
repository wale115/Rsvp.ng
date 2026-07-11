import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  PenLine, Blocks, Users, Share2, Smartphone,
  Heart, Cake, Building2, PartyPopper, MoreHorizontal,
  Play,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-6">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </div>
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
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="inline-block bg-brand-light text-brand text-xs font-medium px-3 py-1 rounded-full mb-5">
            ✦ The Smart Way to Plan &amp; Share Your Events
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-5">
            Beautiful Events <br />
            Start{" "}
            <span className="italic text-pink" style={{ fontFamily: "var(--font-playfair)" }}>
              Here
            </span>
          </h1>
          <p className="text-text-secondary text-lg mb-8 max-w-md">
            Create stunning event experiences, collect RSVPs, and share every detail in one beautiful link.
          </p>
          <div className="flex flex-wrap gap-3 mb-5">
            <Link
              href="/signup"
              className="bg-brand hover:bg-[#5A3AE0] text-white font-medium px-6 py-3 rounded-xl transition-colors active:scale-[0.98]"
            >
              Create Your Event →
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-text-muted">
            <span>✓ No credit card required</span>
            <span>✓ Easy to use</span>
            <span>✓ Free forever</span>
          </div>
        </div>

        {/* Floating phone mockups */}
        <div className="relative h-[420px] hidden md:block">
          <div
            className="absolute left-0 top-8 w-40 h-72 rounded-2xl overflow-hidden shadow-xl -rotate-6 border-4 border-white"
            style={{
              backgroundImage: "url(https://picsum.photos/seed/rsvp-birthday/300/540)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
              Chidinma&apos;s 30th
            </div>
          </div>

          <div
            className="absolute left-32 top-0 w-48 h-[380px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
            style={{
              backgroundImage: "url(https://picsum.photos/seed/rsvp-wedding/360/640)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-lg font-bold leading-tight">Tosin &amp; Bamidele</p>
              <p className="text-xs opacity-80">20TH JULY, 2026 · LAGOS</p>
              <div className="mt-2 bg-white/90 text-ink text-xs font-medium text-center py-1.5 rounded-lg">
                RSVP NOW
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 top-16 w-40 h-72 rounded-2xl overflow-hidden shadow-xl rotate-6 border-4 border-white"
            style={{
              backgroundImage: "url(https://picsum.photos/seed/rsvp-conf/300/540)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-brand/60" />
            <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
              TechNova Summit
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-gray-100 bg-white/60">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="text-center text-sm text-text-muted mb-6">
            Trusted by thousands of people and organizations
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              { icon: Heart, label: "Weddings" },
              { icon: Cake, label: "Birthdays" },
              { icon: Users, label: "Conferences" },
              { icon: Building2, label: "Church Events" },
              { icon: PartyPopper, label: "Parties" },
              { icon: MoreHorizontal, label: "More" },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-2 text-text-secondary">
                <t.icon size={20} className="text-brand" />
                <span className="text-xs">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-center text-xs font-medium text-brand mb-3">✦ Everything You Need</p>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ink mb-12">
          Powerful Features to Make <br className="hidden md:block" /> Every Event Unforgettable
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { icon: PenLine, title: "Beautiful Templates", desc: "Stunning designs for any occasion.", bg: "#F0EDFF", color: "#6C47FF" },
            { icon: Blocks, title: "Easy Customization", desc: "Personalize every detail simply.", bg: "#FFF1E5", color: "#FF9A49" },
            { icon: Users, title: "Smart RSVP", desc: "Track responses in real-time.", bg: "#EAFBF0", color: "#16A34A" },
            { icon: Share2, title: "Share Anywhere", desc: "One link, any platform.", bg: "#EEF1FF", color: "#8EA6FF" },
            { icon: Smartphone, title: "Mobile Friendly", desc: "Perfect on every device.", bg: "#FFEAF3", color: "#FF5FAE" },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-[20px] p-5 text-center">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: f.bg }}
              >
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="font-semibold text-ink text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-text-secondary">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-center text-xs font-medium text-brand mb-3">✦ Simple Process</p>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ink mb-14">How Rsvp.ng Works</h2>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 text-center">
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-gray-200" />
          {[
            { step: "1", title: "Create Your Event", desc: "Add details in minutes.", bg: "#F0EDFF", color: "#6C47FF" },
            { step: "2", title: "Add Your Story", desc: "Photos and everything guests need.", bg: "#FFF1E5", color: "#FF9A49" },
            { step: "3", title: "Share Your Link", desc: "WhatsApp, email, anywhere.", bg: "#EAFBF0", color: "#16A34A" },
            { step: "4", title: "Manage RSVPs", desc: "Track responses, stay organized.", bg: "#EEF1FF", color: "#8EA6FF" },
          ].map((s) => (
            <div key={s.step} className="relative">
              <div
                className="w-10 h-10 rounded-full font-bold flex items-center justify-center mx-auto mb-3 relative z-10"
                style={{ backgroundColor: s.bg, color: s.color }}
              >
                {s.step}
              </div>
              <h3 className="font-semibold text-ink text-sm mb-1">{s.title}</h3>
              <p className="text-xs text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial — replace with a real host quote once you have one */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-medium text-ink mb-3">Loved by hosts, cherished by guests</p>
            <p className="text-text-secondary italic mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              &ldquo;Add a real quote from an early host here once you have one.&rdquo;
            </p>
            <p className="text-sm font-medium text-ink">Host Name</p>
            <p className="text-xs text-text-muted">Lagos, Nigeria</p>
          </div>
          <div
            className="relative rounded-2xl overflow-hidden h-48 md:h-56"
            style={{
              backgroundImage: "url(https://picsum.photos/seed/rsvp-testimonial/500/320)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <Play size={18} className="text-brand ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand to-[#4A2FE0] rounded-3xl px-8 py-14 text-center relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to create your unforgettable event? ♥
          </h2>
          <p className="text-white/80 mb-7">Join hosts across Nigeria. It&apos;s free to get started.</p>
          <div className="flex justify-center gap-3">
            <Link
              href="/signup"
              className="bg-white text-brand font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Logo withTagline />
        </div>
        <p className="text-xs text-text-muted">© 2026 Rsvp.ng. All rights reserved.</p>
      </footer>
    </div>
  );
}
