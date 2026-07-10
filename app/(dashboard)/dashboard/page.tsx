import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventCard from "./event-card";
import LogoutButton from "./logout-button";
import { Logo } from "@/components/logo";
import StatsRow from "./stats-row";

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

  const totalExperiences = experiences?.length ?? 0;
  const publishedCount = experiences?.filter((e) => e.status === "published").length ?? 0;
  const totalRSVPs = guests?.length ?? 0;
  const respondedExperiences = Object.keys(countsByExperience).length;
  const responseRate = totalExperiences > 0 ? Math.round((respondedExperiences / totalExperiences) * 100) : 0;

  return (
    <div className="max-w-xl mx-auto mt-16 space-y-4 px-4">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/dashboard/new" className="bg-brand hover:bg-[#5A3AE0] text-white px-4 py-2 rounded-xl transition-colors">
            + New Event
          </Link>
          <LogoutButton />
        </div>
      </div>

      <StatsRow
        totalExperiences={totalExperiences}
        publishedCount={publishedCount}
        totalRSVPs={totalRSVPs}
        responseRate={responseRate}
      />

      {(!experiences || experiences.length === 0) && (
        <p className="text-gray-500">No events yet. Create your first one.</p>
      )}

      <div className="space-y-4">
        {experiences?.map((e) => (
          <EventCard
            key={e.id}
            id={e.id}
            slug={e.slug}
            title={e.content.title}
            status={e.status}
            counts={countsByExperience[e.id] ?? { going: 0, maybe: 0, declined: 0, total: 0 }}
          />
        ))}
      </div>
    </div>
  );
}
