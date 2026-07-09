import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateExperience } from "@/actions/experience";
import ImageUploader from "@/components/image-uploader";
import { themes } from "@/lib/themes";

export default async function EditExperience({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (!experience) redirect("/dashboard");

  const { title, date, venue, story, cover, gallery, theme } = experience.content;
  const updateWithId = updateExperience.bind(null, id);

  return (
    <form action={updateWithId} className="max-w-sm mx-auto mt-20 space-y-4 px-4 pb-16">
      <h1 className="text-2xl font-bold text-center">Edit Event</h1>
      <input name="title" defaultValue={title} placeholder="Event title" className="border p-3 w-full rounded-xl" required />
      <input name="date" type="datetime-local" defaultValue={date?.slice(0, 16)} className="border p-3 w-full rounded-xl" required />
      <input name="venue" defaultValue={venue} placeholder="Venue" className="border p-3 w-full rounded-xl" required />
      <textarea
        name="story"
        defaultValue={story}
        placeholder="Tell your story (optional)"
        rows={4}
        className="border p-3 w-full rounded-xl"
      />
      <div>
        <label className="text-sm text-text-secondary mb-1 block">Theme</label>
        <select name="theme" className="border p-3 w-full rounded-xl" defaultValue={theme || "default"}>
          {Object.entries(themes).map(([key, t]) => (
            <option key={key} value={key}>{t.label}</option>
          ))}
        </select>
      </div>
      <ImageUploader name="cover" initialUrls={cover ? [cover] : []} multiple={false} />
      <ImageUploader name="gallery" initialUrls={gallery ?? []} />
      <button className="bg-brand hover:bg-[#5A3AE0] text-white p-3 w-full rounded-xl transition-colors">Save Changes</button>
    </form>
  );
}
