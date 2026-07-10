import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ExportButton from "./export-button";
import { ArrowLeft, Users } from "lucide-react";

const statusConfig = {
  going: { label: "Going", bg: "bg-[#EAFBF0]", text: "text-[#16A34A]" },
  maybe: { label: "Maybe", bg: "bg-[#FFF1E5]", text: "text-[#FF9A49]" },
  declined: { label: "Declined", bg: "bg-[#FFEAF3]", text: "text-[#FF5FAE]" },
};

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

  const going = guests?.filter((g) => g.status === "going").length ?? 0;
  const maybe = guests?.filter((g) => g.status === "maybe").length ?? 0;
  const declined = guests?.filter((g) => g.status === "declined").length ?? 0;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-ink transition-colors">
          <ArrowLeft size={15} /> Back to dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
              <Users size={18} className="text-brand" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink leading-tight">{experience.content.title}</h1>
              <p className="text-xs text-text-muted">Guest List</p>
            </div>
          </div>
          <ExportButton guests={guests ?? []} eventTitle={experience.content.title} />
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Going", count: going, bg: "#EAFBF0", color: "#16A34A" },
            { label: "Maybe", count: maybe, bg: "#FFF1E5", color: "#FF9A49" },
            { label: "Declined", count: declined, bg: "#FFEAF3", color: "#FF5FAE" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Guest list */}
        {(!guests || guests.length === 0) ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
            <Users size={32} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No RSVPs yet</p>
            <p className="text-xs text-text-muted mt-1">Share your event link to start collecting responses.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_1fr_auto] gap-3 px-5 py-3 border-b border-gray-100 bg-surface">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Guest</p>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:block">Contact</p>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Status</p>
            </div>
            {guests.map((g, i) => {
              const cfg = statusConfig[g.status as keyof typeof statusConfig] ?? statusConfig.maybe;
              return (
                <div
                  key={g.id}
                  className={`grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_1fr_auto] gap-3 items-center px-5 py-3.5 ${i < guests.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div>
                    <p className="font-medium text-ink text-sm">{g.name}</p>
                    <p className="text-xs text-text-muted sm:hidden">{g.phone}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm text-text-secondary">{g.phone}</p>
                    {g.email && <p className="text-xs text-text-muted">{g.email}</p>}
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
