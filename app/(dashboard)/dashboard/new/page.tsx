import { createExperience } from "@/actions/experience";
import ImageUploader from "@/components/image-uploader";

export default function NewExperience() {
  return (
    <form action={createExperience} className="max-w-sm mx-auto mt-20 space-y-4 px-4 pb-16">
      <h1 className="text-2xl font-bold text-center">New Event</h1>
      <input name="title" placeholder="Event title (e.g. John & Mary)" className="border p-3 w-full rounded-xl" required />
      <input name="date" type="datetime-local" className="border p-3 w-full rounded-xl" required />
      <div>
        <label className="text-sm text-text-secondary mb-1 block">RSVP Deadline (optional)</label>
        <input name="rsvpDeadline" type="datetime-local" className="border p-3 w-full rounded-xl" />
      </div>
      <input name="venue" placeholder="Venue" className="border p-3 w-full rounded-xl" required />
      <ImageUploader name="cover" multiple={false} />
      <ImageUploader name="gallery" />
      <div>
        <label className="text-sm text-text-secondary mb-1 block">Password (optional — leave blank for public)</label>
        <input name="password" type="text" placeholder="e.g. john2027" className="border p-3 w-full rounded-xl" />
      </div>
      <button className="bg-brand hover:bg-[#5A3AE0] text-white p-3 w-full rounded-xl transition-colors">
        Create & Publish
      </button>
    </form>
  );
}
