import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ExportButton from "./export-button";

export default async function GuestsPage({ params }: { params: Promise<{ id: string }> }) {
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

  const { data: guests } = await supabase
    .from("guests")
    .select("*")
    .eq("experience_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-xl mx-auto mt-16 space-y-4 px-4">
      <Link href="/dashboard" className="text-sm text-gray-500">← Back to events</Link>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{experience.content.title} — Guests</h1>
        <ExportButton guests={guests ?? []} eventTitle={experience.content.title} />
      </div>

      {(!guests || guests.length === 0) && <p className="text-gray-500">No RSVPs yet.</p>}

      <div className="divide-y border rounded-xl">
        {guests?.map((g) => (
          <div key={g.id} className="flex justify-between items-center p-3">
            <div>
              <p className="font-medium">{g.name}</p>
              <p className="text-sm text-gray-500">{g.phone}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                g.status === "going"
                  ? "bg-green-100 text-green-700"
                  : g.status === "maybe"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {g.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
