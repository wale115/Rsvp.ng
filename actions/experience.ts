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
  const story = formData.get("story") as string;
  const cover = formData.get("cover") as string;
  const theme = formData.get("theme") as string;
  const rsvpDeadline = formData.get("rsvpDeadline") as string;
  const password = formData.get("password") as string;
  const hideBranding = formData.get("hideBranding") === "on";
  const galleryRaw = formData.get("gallery") as string;

  const gallery = galleryRaw ? galleryRaw.split(",").map((u) => u.trim()).filter(Boolean) : [];
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${nanoid(4)}`;

  const { error } = await supabase.from("experiences").insert({
    owner_id: user.id,
    title,
    slug,
    status: "published",
    content: { title, date, venue, story, cover, gallery, theme, rsvpDeadline, password, hideBranding },
  });

  if (error) {
    console.error(error);
    return;
  }

  redirect(`/e/${slug}`);
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const venue = formData.get("venue") as string;
  const story = formData.get("story") as string;
  const cover = formData.get("cover") as string;
  const theme = formData.get("theme") as string;
  const rsvpDeadline = formData.get("rsvpDeadline") as string;
  const password = formData.get("password") as string;
  const hideBranding = formData.get("hideBranding") === "on";
  const galleryRaw = formData.get("gallery") as string;

  const gallery = galleryRaw ? galleryRaw.split(",").map((u) => u.trim()).filter(Boolean) : [];

  const { error } = await supabase
    .from("experiences")
    .update({ title, content: { title, date, venue, story, cover, gallery, theme, rsvpDeadline, password, hideBranding } })
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    console.error(error);
    return;
  }

  redirect("/dashboard");
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("experiences").delete().eq("id", id).eq("owner_id", user.id);

  redirect("/dashboard");
}
