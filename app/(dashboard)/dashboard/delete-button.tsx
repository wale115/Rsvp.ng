"use client";
import { deleteExperience } from "@/actions/experience";

export default function DeleteButton({ id }: { id: string }) {
  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Delete this event? This cannot be undone.")) {
      await deleteExperience(id);
    }
  }

  return (
    <button onClick={handleDelete} className="text-xs text-red-600 underline">
      Delete
    </button>
  );
}
