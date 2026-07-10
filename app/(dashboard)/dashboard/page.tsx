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
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/new"
              className="bg-brand hover:bg-[#5A3AE0] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              + New Event
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Greeting */}
        <div>
          <h1 className="text-xl font-bold text-ink">Your Events</h1>
          <p className="text-sm text-text-muted mt-0.5">{user.email}</p>
        </div>

        <StatsRow
          totalExperiences={totalExperiences}
          publishedCount={publishedCount}
          totalRSVPs={totalRSVPs}
          responseRate={responseRate}
        />

        {(!experiences || experiences.length === 0) ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C47FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p className="font-semibold text-ink mb-1">No events yet</p>
            <p className="text-sm text-text-muted mb-5">Create your first event to start collecting RSVPs.</p>
            <Link
              href="/dashboard/new"
              className="inline-block bg-brand hover:bg-[#5A3AE0] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              Create Your First Event →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((e) => (
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
        )}
      </div>
    </div>
  );
}

