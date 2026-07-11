"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { itineraryIcons, ItineraryIconKey, ItineraryItem } from "@/lib/itinerary-icons";

export default function ItineraryEditor({
  name,
  initialItems = [],
}: {
  name: string;
  initialItems?: ItineraryItem[];
}) {
  const [items, setItems] = useState<ItineraryItem[]>(initialItems);

  function addItem() {
    setItems((prev) => [...prev, { time: "", label: "", icon: "ceremony" }]);
  }

  function updateItem(index: number, field: keyof ItineraryItem, value: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <label className="text-sm text-text-secondary block">Itinerary (optional)</label>

      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center bg-white border border-gray-200 rounded-xl p-2">
          <input
            type="time"
            value={item.time}
            onChange={(e) => updateItem(i, "time", e.target.value)}
            className="border-none text-sm w-24 focus:outline-none"
          />
          <input
            type="text"
            value={item.label}
            onChange={(e) => updateItem(i, "label", e.target.value)}
            placeholder="e.g. Ceremony begins"
            className="border-none text-sm flex-1 focus:outline-none"
          />
          <select
            value={item.icon}
            onChange={(e) => updateItem(i, "icon", e.target.value)}
            className="border-none text-sm bg-transparent focus:outline-none"
          >
            {(Object.keys(itineraryIcons) as ItineraryIconKey[]).map((key) => (
              <option key={key} value={key}>
                {itineraryIcons[key].label}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => removeItem(i)} className="text-red-500 shrink-0">
            <X size={16} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-sm text-brand font-medium"
      >
        <Plus size={16} /> Add itinerary item
      </button>
    </div>
  );
}
