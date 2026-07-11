import { createClient } from "@/lib/supabase/server";
import RSVPForm from "./rsvp-form";
import Countdown from "./countdown";
import { Logo } from "@/components/logo";
import Image from "next/image";
import PasswordGate from "./password-gate";
import AnimatedCard from "./animated-card";
import Reveal from "@/components/reveal";
import AmbientBackground from "@/components/ambient-background";
import ParallaxCover from "@/components/parallax-cover";
import EnvelopeIntro from "@/components/envelope-intro";
import { getInitials } from "@/lib/get-initials";
import ItineraryTimeline from "./itinerary-timeline";
import { themes, defaultTheme, type ThemeKey } from "@/lib/themes";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-text-secondary">This event is no longer available.</p>
      </div>
    );
  }

  const { title, date, venue, story, cover, gallery, theme: themeKey, rsvpDeadline, password, hideBranding, itinerary, dressCode } = experience.content;
  const theme = themes[(themeKey as ThemeKey) ?? defaultTheme] ?? themes[defaultTheme];
  const isClosed = rsvpDeadline && new Date(rsvpDeadline) < new Date();

  const content = (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
      style={{ background: `linear-gradient(to bottom, ${theme.accentLight}, #F2F4F8)` }}
    >
      <EnvelopeIntro initials={getInitials(title)} accent={theme.accent} />
      <AmbientBackground accent={theme.accent} />
      <AnimatedCard>
        {cover && <ParallaxCover src={cover} />}
        <p className="text-xs tracking-widest uppercase font-medium" style={{ color: theme.accent }}>
          You&apos;re Invited
        </p>
        <h1 className="text-4xl font-bold text-ink">{title}</h1>
        <p className="text-text-secondary">
          {new Date(date).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
        </p>
        <p className="text-text-secondary">{venue}</p>

        <Countdown date={date} accent={theme.accent} accentLight={theme.accentLight} />

        {story && (
          <Reveal>
            <div className="text-left pt-4 border-t border-gray-100">
              <h2 className="text-sm uppercase tracking-wide text-text-muted mb-2">Our Story</h2>
              <p className="text-text-secondary whitespace-pre-line">{story}</p>
            </div>
          </Reveal>
        )}

        {itinerary && itinerary.length > 0 && (
          <Reveal>
            <div className="pt-4 border-t border-gray-100">
              <ItineraryTimeline items={itinerary} accent={theme.accent} accentLight={theme.accentLight} />
            </div>
          </Reveal>
        )}

        {dressCode && (
          <Reveal>
            <div className="pt-4 border-t border-gray-100 text-center">
              <h2 className="text-sm uppercase tracking-wide text-text-muted mb-1">Dress Code</h2>
              <p className="text-ink font-medium" style={{ fontFamily: "var(--font-playfair, serif)" }}>
                {dressCode}
              </p>
            </div>
          </Reveal>
        )}

        {gallery && gallery.length > 0 && (
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
              {gallery.map((url: string, i: number) => (
                <Image key={i} src={url} alt="" width={300} height={150} className="w-full h-32 object-cover rounded-xl" />
              ))}
            </div>
          </Reveal>
        )}

        <div className="pt-4 border-t border-gray-100">
          {isClosed ? (
            <p className="text-text-secondary">RSVPs have closed for this event.</p>
          ) : (
            <RSVPForm
              experienceId={experience.id}
              accent={theme.accent}
              decoration={theme.decoration}
            />
          )}
        </div>

        {!hideBranding && (
          <div className="pt-4 flex justify-center opacity-60">
            <Logo />
          </div>
        )}
      </AnimatedCard>
    </div>
  );

  if (password) {
    return <PasswordGate correctPassword={password}>{content}</PasswordGate>;
  }

  return content;
}
