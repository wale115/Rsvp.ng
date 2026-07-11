export function getInitials(title: string): string {
  const separators = /&| and /i;
  if (separators.test(title)) {
    const parts = title.split(separators).map((p) => p.trim());
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)} & ${parts[1].charAt(0)}`.toUpperCase();
    }
  }
  return title.charAt(0).toUpperCase();
}
