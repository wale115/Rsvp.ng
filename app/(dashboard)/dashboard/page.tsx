import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

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

      {experiences?.map((e) => (
        <Link key={e.id} href={`/e/${e.slug}`} className="block border p-4 rounded-xl hover:shadow">
          <p className="font-semibold">{e.content.title}</p>
          <p className="text-sm text-gray-500">{e.status}</p>
        </Link>
      ))}
    </div>
  );
}
