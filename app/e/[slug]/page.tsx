import { createClient } from "@/lib/supabase/server";
import RSVPForm from "./rsvp-form";
import Countdown from "./countdown";
import { Logo } from "@/components/logo";
import Image from "next/image";
import type { Metadata } from "next";
import { themes, defaultTheme, ThemeKey } from "@/lib/themes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!experience) {
    return { title: "Event Not Found — Rsvp.ng" };
  }

  const { title, date, venue, cover } = experience.content;
  const description = `${new Date(date).toLocaleDateString(undefined, { dateStyle: "long" })} · ${venue}`;

  return {
    title: `${title} — You're Invited`,
    description,
    openGraph: {
      title: `${title} — You're Invited`,
      description,
      images: cover ? [{ url: cover, width: 600, height: 300 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — You're Invited`,
      description,
      images: cover ? [cover] : [],
    },
  };
}

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

  const { title, date, venue, story, cover, gallery } = experience.content;
  const themeKey = (experience.content.theme as ThemeKey) || defaultTheme;
  const theme = themes[themeKey] ?? themes[defaultTheme];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F0EDFF] to-surface px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl">
        {cover && (
          <Image
            src={cover}
            alt=""
            width={600}
            height={300}
            className="w-full h-56 object-cover rounded-2xl -mt-4 mb-2"
            priority
          />
        )}
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
          <div className="text-left pt-4 border-t border-gray-100">
            <h2 className="text-sm uppercase tracking-wide text-text-muted mb-2">Our Story</h2>
            <p className="text-text-secondary whitespace-pre-line">{story}</p>
          </div>
        )}
        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
            {gallery.map((url: string, i: number) => (
              <Image key={i} src={url} alt="" width={300} height={150} className="w-full h-32 object-cover rounded-xl" />
            ))}
          </div>
        )}
        <div className="pt-4 border-t border-gray-100">
          <RSVPForm experienceId={experience.id} accent={theme.accent} />
        </div>
        <div className="pt-4 flex justify-center opacity-60">
          <Logo />
        </div>
      </div>
    </div>
  );
}
