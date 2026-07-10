import { createClient } from "@supabase/supabase-js";
import { sendEventReminder } from "@/lib/email";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Service role client — cron job has no logged-in user, must bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .eq("status", "published");

  if (!experiences) {
    return NextResponse.json({ sent: 0 });
  }

  const now = new Date();
  const tomorrowStart = new Date(now);
  tomorrowStart.setDate(now.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setHours(23, 59, 59, 999);

  let sentCount = 0;

  for (const experience of experiences) {
    const eventDate = new Date(experience.content.date);
    if (eventDate < tomorrowStart || eventDate > tomorrowEnd) continue;

    const { data: guests } = await supabase
      .from("guests")
      .select("*")
      .eq("experience_id", experience.id)
      .eq("status", "going")
      .eq("reminder_sent", false)
      .not("email", "is", null);

    if (!guests) continue;

    for (const guest of guests) {
      await sendEventReminder({
        to: guest.email,
        guestName: guest.name,
        eventTitle: experience.content.title,
        eventDate: experience.content.date,
        venue: experience.content.venue,
      });

      await supabase.from("guests").update({ reminder_sent: true }).eq("id", guest.id);
      sentCount++;
    }
  }

  return NextResponse.json({ sent: sentCount });
}
