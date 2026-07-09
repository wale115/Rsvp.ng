import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShareButtons from "./share-buttons";
import DeleteButton from "./delete-button";

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
        <Link href="/dashboard/new" className="bg-black text-white px-4 py-2 rounded-xl">
          + New Event
        </Link>
      </div>

      {(!experiences || experiences.length === 0) && (
        <p className="text-gray-500">No events yet. Create your first one.</p>
      )}

      <div className="space-y-4">
        {experiences?.map((e) => {
          const counts = countsByExperience[e.id] ?? { going: 0, maybe: 0, declined: 0, total: 0 };
          return (
            <Link key={e.id} href={`/e/${e.slug}`} className="block border p-4 rounded-xl hover:shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{e.content.title}</p>
                  <p className="text-sm text-gray-500">{e.status}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{counts.total} response{counts.total !== 1 ? "s" : ""}</p>
                  <p className="text-gray-500">
                    {counts.going} going · {counts.maybe} maybe · {counts.declined} declined
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <ShareButtons slug={e.slug} />
                <div className="flex gap-3 items-center">
                  <Link
                    href={`/dashboard/${e.id}/edit`}
                    onClick={(ev) => ev.stopPropagation()}
                    className="text-xs text-gray-600 underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/dashboard/${e.id}/guests`}
                    onClick={(ev) => ev.stopPropagation()}
                    className="text-xs text-blue-600 underline"
                  >
                    View Guests
                  </Link>
                  <DeleteButton id={e.id} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
