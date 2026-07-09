import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventCard from "./event-card";
import LogoutButton from "./logout-button";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  const experienceIds = experiences?.map((e) => e.id) ?? [];

  const { data: guests } = experienceIds.length
    ? await supabase.from("guests").select("experience_id, status").in("experience_id", experienceIds)
    : { data: [] };

  const countsByExperience = (guests ?? []).reduce<
    Record<string, { going: number; maybe: number; declined: number; total: number }>
  >((acc, g) => {
    if (!acc[g.experience_id]) acc[g.experience_id] = { going: 0, maybe: 0, declined: 0, total: 0 };
    acc[g.experience_id][g.status as "going" | "maybe" | "declined"]++;
    acc[g.experience_id].total++;
    return acc;
  }, {});

  return (
    <div className="max-w-xl mx-auto mt-16 space-y-4 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Events</h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/new" className="bg-brand hover:bg-[#5A3AE0] text-white px-4 py-2 rounded-xl transition-colors">
            + New Event
          </Link>
          <LogoutButton />
        </div>
      </div>

      {(!experiences || experiences.length === 0) && (
        <p className="text-gray-500">No events yet. Create your first one.</p>
      )}

      <div className="space-y-4">
        {experiences?.map((e) => {
          const counts = countsByExperience[e.id] ?? { going: 0, maybe: 0, declined: 0, total: 0 };
          return (
            <EventCard
              key={e.id}
              id={e.id}
              slug={e.slug}
              title={e.content.title}
              status={e.status}
              counts={counts}
            />
          );
        })}
      </div>
    </div>
  );
}
