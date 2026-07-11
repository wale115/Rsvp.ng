import { Church, Wine, UtensilsCrossed, PartyPopper, Clock, Heart, Music, Car } from "lucide-react";

export const itineraryIcons = {
  ceremony: { icon: Church, label: "Ceremony" },
  toast: { icon: Wine, label: "Cocktail / Toast" },
  dinner: { icon: UtensilsCrossed, label: "Dinner" },
  party: { icon: PartyPopper, label: "Party" },
  vows: { icon: Heart, label: "Vows" },
  music: { icon: Music, label: "First Dance" },
  transport: { icon: Car, label: "Transport" },
  end: { icon: Clock, label: "End" },
} as const;

export type ItineraryIconKey = keyof typeof itineraryIcons;

export interface ItineraryItem {
  time: string;
  label: string;
  icon: ItineraryIconKey;
}
