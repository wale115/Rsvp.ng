"use client";

interface Guest {
  name: string;
  phone: string;
  status: string;
  created_at: string;
}

export default function ExportButton({ guests, eventTitle }: { guests: Guest[]; eventTitle: string }) {
  function handleExport() {
    const headers = ["Name", "Phone", "Status", "Submitted At"];
    const rows = guests.map((g) => [
      g.name,
      g.phone,
      g.status,
      new Date(g.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${eventTitle.replace(/[^a-z0-9]+/gi, "-")}-guests.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (guests.length === 0) return null;

  return (
    <button
      onClick={handleExport}
      className="text-sm font-medium border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50"
    >
      Export CSV
    </button>
  );
}
