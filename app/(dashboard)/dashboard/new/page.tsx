import { createExperience } from "@/actions/experience";
import ImageUploader from "@/components/image-uploader";
import ItineraryEditor from "@/components/itinerary-editor";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Lock, Image as ImageIcon, Settings2, ListOrdered } from "lucide-react";

export default function NewExperience() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-text-secondary mb-8 hover:text-ink transition-colors">
          <ArrowLeft size={15} /> Back to dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ink">Create New Event</h1>
          <p className="text-text-secondary text-sm mt-1">Fill in the details to publish your event page.</p>
        </div>

        <form action={createExperience} className="space-y-6">
          {/* Event Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays size={16} className="text-brand" />
              <h2 className="text-sm font-semibold text-ink uppercase tracking-wide">Event Details</h2>
            </div>
            <div>
              <label className="text-sm font-medium text-ink mb-1 block">Event Title <span className="text-pink">*</span></label>
              <input
                name="title"
                placeholder="e.g. John & Mary's Wedding"
                className="border border-gray-200 bg-surface p-3 w-full rounded-xl text-ink placeholder:text-text-muted focus:border-brand focus:bg-white transition-colors"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ink mb-1 block">Event Date & Time <span className="text-pink">*</span></label>
                <input name="date" type="datetime-local" className="border border-gray-200 bg-surface p-3 w-full rounded-xl text-ink focus:border-brand focus:bg-white transition-colors" required />
              </div>
              <div>
                <label className="text-sm font-medium text-ink mb-1 block">RSVP Deadline</label>
                <input name="rsvpDeadline" type="datetime-local" className="border border-gray-200 bg-surface p-3 w-full rounded-xl text-ink focus:border-brand focus:bg-white transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-ink mb-1 flex items-center gap-1.5 block">
                <MapPin size={13} className="text-text-muted" /> Venue <span className="text-pink">*</span>
              </label>
              <input name="venue" placeholder="e.g. Eko Hotel, Lagos" className="border border-gray-200 bg-surface p-3 w-full rounded-xl text-ink placeholder:text-text-muted focus:border-brand focus:bg-white transition-colors" required />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon size={16} className="text-brand" />
              <h2 className="text-sm font-semibold text-ink uppercase tracking-wide">Media</h2>
            </div>
            <div>
              <label className="text-sm font-medium text-ink mb-2 block">Cover Photo</label>
              <ImageUploader name="cover" multiple={false} />
            </div>
            <div>
              <label className="text-sm font-medium text-ink mb-2 block">Gallery Photos</label>
              <ImageUploader name="gallery" />
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ListOrdered size={16} className="text-brand" />
              <h2 className="text-sm font-semibold text-ink uppercase tracking-wide">Schedule</h2>
            </div>
            <ItineraryEditor name="itinerary" />
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Dress Code (optional)</label>
              <input
                name="dressCode"
                placeholder="e.g. Elegant, Black Tie, Ankara, Casual"
                className="border border-gray-200 bg-surface p-3 w-full rounded-xl text-ink placeholder:text-text-muted focus:border-brand focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings2 size={16} className="text-brand" />
              <h2 className="text-sm font-semibold text-ink uppercase tracking-wide">Settings</h2>
            </div>
            <div>
              <label className="text-sm font-medium text-ink mb-1 flex items-center gap-1.5 block">
                <Lock size={13} className="text-text-muted" /> Password Protection
              </label>
              <input
                name="password"
                type="text"
                placeholder="Leave blank for public access"
                className="border border-gray-200 bg-surface p-3 w-full rounded-xl text-ink placeholder:text-text-muted focus:border-brand focus:bg-white transition-colors"
              />
              <p className="text-xs text-text-muted mt-1">Guests will need this password to view the event page.</p>
            </div>
            <label className="flex items-center gap-3 border border-gray-200 bg-surface rounded-xl p-4 cursor-pointer hover:border-brand transition-colors">
              <input type="checkbox" name="hideBranding" className="w-4 h-4 accent-brand shrink-0" />
              <div>
                <p className="text-sm font-medium text-ink">Remove Rsvp.ng branding</p>
                <p className="text-xs text-text-muted mt-0.5">Premium feature — hide the footer logo on your event page.</p>
              </div>
            </label>
          </div>

          <button className="bg-brand hover:bg-[#5A3AE0] text-white p-3.5 w-full rounded-xl font-medium transition-colors shadow-sm">
            Create &amp; Publish Event →
          </button>
        </form>
      </div>
    </div>
  );
}
