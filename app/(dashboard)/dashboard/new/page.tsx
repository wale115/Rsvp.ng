import { createExperience } from "@/actions/experience";

export default function NewExperience() {
  return (
    <form action={createExperience} className="max-w-sm mx-auto mt-20 space-y-4 px-4">
      <h1 className="text-2xl font-bold text-center">New Event</h1>
      <input name="title" placeholder="Event title (e.g. John & Mary)" className="border p-3 w-full rounded-xl" required />
      <input name="date" type="datetime-local" className="border p-3 w-full rounded-xl" required />
      <input name="venue" placeholder="Venue" className="border p-3 w-full rounded-xl" required />
      <button className="bg-black text-white p-3 w-full rounded-xl">Create & Publish</button>
    </form>
  );
}
