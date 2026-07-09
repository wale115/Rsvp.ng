export type ThemeKey = "wedding" | "birthday" | "church" | "default";

export interface Theme {
  label: string;
  accent: string;
  accentLight: string;
  decoration: "none" | "confetti" | "hearts";
}

export const themes: Record<ThemeKey, Theme> = {
  default: {
    label: "Classic",
    accent: "#6C47FF",
    accentLight: "#F0EDFF",
    decoration: "none",
  },
  wedding: {
    label: "Wedding",
    accent: "#FF5FAE",
    accentLight: "#FFEAF3",
    decoration: "hearts",
  },
  birthday: {
    label: "Birthday",
    accent: "#FF9A49",
    accentLight: "#FFF1E5",
    decoration: "confetti",
  },
  church: {
    label: "Church / Conference",
    accent: "#8EA6FF",
    accentLight: "#EEF1FF",
    decoration: "none",
  },
};

export const defaultTheme: ThemeKey = "default";
