import { createExperience } from "@/actions/experience";
import ImageUploader from "@/components/image-uploader";
import ItineraryEditor from "@/components/itinerary-editor";
import AudioUploader from "@/components/audio-uploader";
import { FormGroup, FormRow } from "@/components/form-group";
import { themes } from "@/lib/themes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewExperience() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-md mx-auto px-4 py-10 pb-20">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary mb-8 hover:text-ink transition-colors"
        >
          <ArrowLeft size={15} /> Back to dashboard
        </Link>

        <h1 className="text-2xl font-bold text-ink mb-8">New Event</h1>

        <form action={createExperience} className="space-y-6">
          {/* Core details */}
          <FormGroup>
            <FormRow label="Event Title">
              <input name="title" placeholder="John & Mary's Wedding" required />
            </FormRow>
            <FormRow label="Date & Time">
              <input name="date" type="datetime-local" required />
            </FormRow>
            <FormRow label="Venue">
              <input name="venue" placeholder="Eko Hotel, Lagos" required />
            </FormRow>
            <FormRow label="RSVP Deadline">
              <input name="rsvpDeadline" type="datetime-local" />
            </FormRow>
            <FormRow label="Dress Code">
              <input name="dressCode" placeholder="Elegant, Black Tie, Ankara…" />
            </FormRow>
          </FormGroup>

          {/* Theme */}
          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Template</p>
            <FormGroup>
              <FormRow label="Choose a theme">
                <select name="theme" defaultValue="classic">
                  {Object.entries(themes).map(([key, t]) => (
                    <option key={key} value={key}>{t.label}</option>
                  ))}
                </select>
              </FormRow>
            </FormGroup>
          </div>

          {/* Story */}
          <FormGroup>
            <FormRow label="Your Story">
              <textarea name="story" placeholder="Tell your story… (optional)" rows={4} />
            </FormRow>
          </FormGroup>

          {/* Media */}
          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Cover Photo</p>
            <div className="ios-group p-4">
              <ImageUploader name="cover" multiple={false} />
            </div>
          </div>

          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Gallery</p>
            <div className="ios-group p-4">
              <ImageUploader name="gallery" />
            </div>
          </div>

          {/* Schedule & music */}
          <div>
            <p className="text-xs text-text-muted mb-2 px-1 uppercase tracking-wide">Schedule</p>
            <div className="ios-group p-4">
              <ItineraryEditor name="itinerary" />
            </div>
          </div>

          <div className="ios-group p-4">
            <AudioUploader name="music" />
          </div>

          {/* Settings */}
          <FormGroup>
            <FormRow label="Password">
              <input name="password" placeholder="Leave blank for public access" />
            </FormRow>
          </FormGroup>

          <label className="ios-group flex items-center gap-3 p-4 cursor-pointer">
            <input type="checkbox" name="hideBranding" className="w-4 h-4 accent-brand shrink-0" />
            <div>
              <p className="text-sm font-medium text-ink">Remove Rsvp.ng branding</p>
              <p className="text-xs text-text-muted mt-0.5">Premium — hide the footer logo</p>
            </div>
          </label>

          <button className="bg-brand hover:bg-[#5A3AE0] text-white p-4 w-full rounded-2xl font-medium transition-colors active:scale-[0.98]">
            Create &amp; Publish →
          </button>
        </form>
      </div>
    </div>
  );
}
