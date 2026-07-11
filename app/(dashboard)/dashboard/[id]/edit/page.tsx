import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateExperience } from "@/actions/experience";
import ImageUploader from "@/components/image-uploader";
import ItineraryEditor from "@/components/itinerary-editor";
import AudioUploader from "@/components/audio-uploader";
import StoryEditor from "@/components/story-editor";
import DateTimePicker from "@/components/date-time-picker";
import { FormGroup, FormRow } from "@/components/form-group";
import { themes } from "@/lib/themes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditExperience({ params }: { params: Promise<{ id: string }> }) {
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

  const {
    title, date, venue, cover, gallery,
    theme, rsvpDeadline, password, hideBranding,
    itinerary, dressCode, music, storyChapters,
  } = experience.content;

  const updateWithId = updateExperience.bind(null, id);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-md mx-auto px-4 py-10 pb-20">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary mb-8 hover:text-ink transition-colors"
        >
          <ArrowLeft size={15} /> Back to dashboard
        </Link>

        <h1 className="text-2xl font-bold text-ink mb-1">Edit Event</h1>
        <p className="text-text-secondary text-sm mb-8">
          Editing <span className="font-medium text-ink">{title}</span>
        </p>

        <form action={updateWithId} className="space-y-6">
          {/* Core details */}
          <FormGroup>
            <FormRow label="Event Title">
              <input name="title" defaultValue={title} placeholder="John & Mary's Wedding" required />
            </FormRow>
            <FormRow label="Date & Time">
              <DateTimePicker name="date" defaultValue={date} placeholder="When is your event?" />
            </FormRow>
            <FormRow label="Venue">
              <input name="venue" defaultValue={venue} placeholder="Eko Hotel, Lagos" required />
            </FormRow>
            <FormRow label="RSVP Deadline">
              <DateTimePicker name="rsvpDeadline" defaultValue={rsvpDeadline} placeholder="Optional cutoff" />
            </FormRow>
            <FormRow label="Dress Code">
              <input name="dressCode" defaultValue={dressCode} placeholder="Elegant, Black Tie, Ankara…" />
            </FormRow>
          </FormGroup>

          {/* Theme */}
          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Template</p>
            <FormGroup>
              <FormRow label="Choose a theme">
                <select name="theme" defaultValue={theme ?? "classic"}>
                  {Object.entries(themes).map(([key, t]) => (
                    <option key={key} value={key}>{t.label}</option>
                  ))}
                </select>
              </FormRow>
            </FormGroup>
          </div>

          {/* Story */}
          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Your Story</p>
            <div className="ios-group p-4">
              <StoryEditor name="storyChapters" initialChapters={storyChapters ?? []} />
            </div>
          </div>

          {/* Media */}
          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Cover Photo</p>
            <div className="ios-group p-4">
              <ImageUploader name="cover" initialUrls={cover ? [cover] : []} multiple={false} />
            </div>
          </div>

          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Gallery</p>
            <div className="ios-group p-4">
              <ImageUploader name="gallery" initialUrls={gallery ?? []} />
            </div>
          </div>

          {/* Schedule & music */}
          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Schedule</p>
            <div className="ios-group p-4">
              <ItineraryEditor name="itinerary" initialItems={itinerary ?? []} />
            </div>
          </div>

          <div className="ios-group p-4">
            <AudioUploader name="music" initialUrl={music ?? ""} />
          </div>

          {/* Settings */}
          <FormGroup>
            <FormRow label="Password">
              <input name="password" defaultValue={password} placeholder="Leave blank for public access" />
            </FormRow>
          </FormGroup>

          <label className="ios-group flex items-center gap-3 p-4 cursor-pointer">
            <input type="checkbox" name="hideBranding" defaultChecked={hideBranding} className="w-4 h-4 accent-brand shrink-0" />
            <div>
              <p className="text-sm font-medium text-ink">Remove Rsvp.ng branding</p>
              <p className="text-xs text-text-muted mt-0.5">Premium — hide the footer logo</p>
            </div>
          </label>

          <button className="bg-brand hover:bg-[#5A3AE0] text-white p-4 w-full rounded-2xl font-medium transition-colors active:scale-[0.98]">
            Save Changes →
          </button>
        </form>
      </div>
    </div>
  );
}
