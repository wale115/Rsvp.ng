export type ThemeKey =
  | "classic"
  | "editorial"
  | "cinematic"
  | "coastal"
  | "moody"
  | "oldmoney";

export interface Theme {
  label: string;
  accent: string;
  accentLight: string;
  surface: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  headingFont: string;
  decoration: "none" | "confetti" | "hearts";
  cardStyle: "rounded" | "sharp";
  motion: {
    cardDuration: number;
    cardEase: [number, number, number, number];
    revealDuration: number;
  };
  decor: "none" | "flourish" | "grain" | "mist" | "ornate";
}

export const themes: Record<ThemeKey, Theme> = {
  classic: {
    label: "Classic",
    accent: "#6C47FF",
    accentLight: "#F0EDFF",
    surface: "#FFFFFF",
    background: "linear-gradient(to bottom, #F0EDFF, #F2F4F8)",
    textPrimary: "#1A1D3A",
    textSecondary: "#6B7280",
    headingFont: "var(--font-fraunces)",
    decoration: "confetti",
    cardStyle: "rounded",
    motion: { cardDuration: 0.7, cardEase: [0.22, 1, 0.36, 1], revealDuration: 0.6 },
    decor: "none",
  },
  editorial: {
    label: "The Editorial",
    accent: "#1A1A1A",
    accentLight: "#F0EEE9",
    surface: "#FAF8F4",
    background: "linear-gradient(to bottom, #F5F2EC, #EDE9E0)",
    textPrimary: "#1A1A1A",
    textSecondary: "#6B6558",
    headingFont: "var(--font-fraunces)",
    decoration: "none",
    cardStyle: "sharp",
    motion: { cardDuration: 0.9, cardEase: [0.16, 1, 0.3, 1], revealDuration: 0.8 },
    decor: "flourish",
  },
  cinematic: {
    label: "The Cinematic",
    accent: "#8B1E2E",
    accentLight: "#F3D9DC",
    surface: "#FBF6F2",
    background: "linear-gradient(to bottom, #2A1315, #1A0D0E)",
    textPrimary: "#2A1315",
    textSecondary: "#7A5A5A",
    headingFont: "var(--font-fraunces)",
    decoration: "none",
    cardStyle: "sharp",
    motion: { cardDuration: 1.1, cardEase: [0.65, 0, 0.35, 1], revealDuration: 0.9 },
    decor: "grain",
  },
  coastal: {
    label: "The Coastal",
    accent: "#B08968",
    accentLight: "#F3EBE1",
    surface: "#FBF7F0",
    background: "linear-gradient(to bottom, #E8DCC8, #F3EBE1)",
    textPrimary: "#4A3F30",
    textSecondary: "#8A7A63",
    headingFont: "var(--font-fraunces)",
    decoration: "none",
    cardStyle: "rounded",
    motion: { cardDuration: 0.8, cardEase: [0.22, 1, 0.36, 1], revealDuration: 0.7 },
    decor: "flourish",
  },
  moody: {
    label: "The Moody",
    accent: "#4A5C3F",
    accentLight: "#E4E8DD",
    surface: "#F5F3ED",
    background: "linear-gradient(to bottom, #1F2818, #14180F)",
    textPrimary: "#1F2818",
    textSecondary: "#5C664F",
    headingFont: "var(--font-playfair)",
    decoration: "none",
    cardStyle: "sharp",
    motion: { cardDuration: 1.0, cardEase: [0.65, 0, 0.35, 1], revealDuration: 0.85 },
    decor: "mist",
  },
  oldmoney: {
    label: "The Old Money",
    accent: "#7A1F2B",
    accentLight: "#EFDCC8",
    surface: "#F7EFDF",
    background: "linear-gradient(to bottom, #3D1218, #240A0D)",
    textPrimary: "#3D1218",
    textSecondary: "#8A6A4A",
    headingFont: "var(--font-playfair)",
    decoration: "none",
    cardStyle: "sharp",
    motion: { cardDuration: 1.0, cardEase: [0.65, 0, 0.35, 1], revealDuration: 0.8 },
    decor: "ornate",
  },
};

export const defaultTheme: ThemeKey = "classic";
