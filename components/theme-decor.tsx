export default function ThemeDecor({ decor, accent }: { decor: string; accent: string }) {
  if (decor === "none") return null;

  if (decor === "flourish") {
    return (
      <>
        <svg
          width="70"
          height="70"
          viewBox="0 0 80 80"
          className="absolute top-3 left-3 opacity-30 pointer-events-none"
        >
          <path
            d="M8 8 Q25 4 34 18 Q42 4 60 8 Q52 22 40 26 Q52 34 48 48 Q36 40 32 26 Q20 34 8 26 Q22 18 8 8Z"
            fill={accent}
          />
        </svg>
        <svg
          width="70"
          height="70"
          viewBox="0 0 80 80"
          className="absolute bottom-3 right-3 opacity-30 pointer-events-none rotate-180"
        >
          <path
            d="M8 8 Q25 4 34 18 Q42 4 60 8 Q52 22 40 26 Q52 34 48 48 Q36 40 32 26 Q20 34 8 26 Q22 18 8 8Z"
            fill={accent}
          />
        </svg>
      </>
    );
  }

  if (decor === "grain") {
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    );
  }

  if (decor === "mist") {
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ background: `radial-gradient(ellipse at top, ${accent}, transparent 70%)` }}
      />
    );
  }

  if (decor === "ornate") {
    return (
      <div
        className="absolute inset-3 border pointer-events-none opacity-40"
        style={{ borderColor: accent, borderWidth: "1.5px" }}
      />
    );
  }

  return null;
}
