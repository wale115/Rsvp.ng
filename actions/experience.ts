"use server";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createExperience(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const venue = formData.get("venue") as string;
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${nanoid(4)}`;

  const { error } = await supabase.from("experiences").insert({
    owner_id: user.id,
    title,
    slug,
    status: "published",
    content: { title, date, venue },
  });

  if (error) {
    console.error(error);
    return;
  }

  redirect(`/e/${slug}`);
}
