import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateExperience } from "@/actions/experience";

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

  const { title, date, venue } = experience.content;
  const updateWithId = updateExperience.bind(null, id);

  return (
    <form action={updateWithId} className="max-w-sm mx-auto mt-20 space-y-4 px-4">
      <h1 className="text-2xl font-bold text-center">Edit Event</h1>
      <input name="title" defaultValue={title} placeholder="Event title" className="border p-3 w-full rounded-xl" required />
      <input name="date" type="datetime-local" defaultValue={date?.slice(0, 16)} className="border p-3 w-full rounded-xl" required />
      <input name="venue" defaultValue={venue} placeholder="Venue" className="border p-3 w-full rounded-xl" required />
      <button className="bg-black text-white p-3 w-full rounded-xl">Save Changes</button>
    </form>
  );
}
