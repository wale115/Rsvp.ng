"use server";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { sendRSVPConfirmation } from "@/lib/email";

const MAX_SUBMISSIONS_PER_HOUR = 10;

export async function submitRSVP(
  experienceId: string,
  name: string,
  phone: string,
  status: "going" | "maybe" | "declined",
  email?: string
) {
  const supabase = await createClient();
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Rate limit: max submissions per IP per hour, across all events
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("guests")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", oneHourAgo);

  if ((count ?? 0) >= MAX_SUBMISSIONS_PER_HOUR) {
    return { error: "Too many submissions. Please try again later." };
  }

  const { error } = await supabase.from("guests").insert({
    experience_id: experienceId,
    name,
    phone,
    email: email || null,
    status,
    ip_address: ip,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "You've already RSVP'd for this event." };
    }
    return { error: error.message };
  }

  // Send confirmation email if guest provided one and is attending
  if (email && status === "going") {
    const { data: experience } = await supabase
      .from("experiences")
      .select("content")
      .eq("id", experienceId)
      .single();

    if (experience) {
      await sendRSVPConfirmation({
        to: email,
        guestName: name,
        eventTitle: experience.content.title,
        eventDate: experience.content.date,
        venue: experience.content.venue,
      });
    }
  }

  return { success: true };
}
