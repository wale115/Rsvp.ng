import { createClient } from "@/lib/supabase/server";
import RSVPForm from "./rsvp-form";

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
      <div className="text-center mt-20 px-4">
        <p className="text-gray-500">This event is no longer available.</p>
      </div>
    );
  }

  const { title, date, venue } = experience.content;

  return (
    <div className="max-w-lg mx-auto mt-16 text-center space-y-6 px-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-gray-600">
        {new Date(date).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
      </p>
      <p className="text-gray-600">{venue}</p>
      <RSVPForm experienceId={experience.id} />
    </div>
  );
}
