export const themes = {
  default: { accent: "#6C47FF", accentLight: "#F0EDFF", decoration: "confetti" as const },
  rose: { accent: "#FF5FAE", accentLight: "#FFEAF3", decoration: "hearts" as const },
  sky: { accent: "#8EA6FF", accentLight: "#EEF1FF", decoration: "confetti" as const },
  orange: { accent: "#FF9A49", accentLight: "#FFF1E5", decoration: "confetti" as const },
  green: { accent: "#16A34A", accentLight: "#EAFBF0", decoration: "confetti" as const },
};

export type ThemeKey = keyof typeof themes;
export const defaultTheme: ThemeKey = "default";
