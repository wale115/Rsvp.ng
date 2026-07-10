import { createClient } from "@/lib/supabase/server";
import RSVPForm from "./rsvp-form";
import Countdown from "./countdown";
import { Logo } from "@/components/logo";
import Image from "next/image";
import PasswordGate from "./password-gate";

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

  const { title, date, venue, cover, gallery, theme, rsvpDeadline, password } = experience.content;
  const isClosed = rsvpDeadline && new Date(rsvpDeadline) < new Date();

  const content = (
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
        <p className="text-xs tracking-widest uppercase text-pink font-medium">You&apos;re Invited</p>
        <h1 className="text-4xl font-bold text-ink">{title}</h1>
        <p className="text-text-secondary">
          {new Date(date).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
        </p>
        <p className="text-text-secondary">{venue}</p>
        <Countdown date={date} />
        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
            {gallery.map((url: string, i: number) => (
              <Image key={i} src={url} alt="" width={300} height={150} className="w-full h-32 object-cover rounded-xl" />
            ))}
          </div>
        )}
        <div className="pt-4 border-t border-gray-100">
          {isClosed ? (
            <p className="text-text-secondary">RSVPs have closed for this event.</p>
          ) : (
            <RSVPForm experienceId={experience.id} accent={theme?.accent} />
          )}
        </div>
        <div className="pt-4 flex justify-center opacity-60">
          <Logo />
        </div>
      </div>
    </div>
  );

  if (password) {
    return <PasswordGate correctPassword={password}>{content}</PasswordGate>;
  }

  return content;
}
