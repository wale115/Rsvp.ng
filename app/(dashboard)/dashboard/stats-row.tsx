import { Calendar, CheckCircle2, Users, TrendingUp } from "lucide-react";

interface StatsRowProps {
  totalExperiences: number;
  publishedCount: number;
  totalRSVPs: number;
  responseRate: number;
}

export default function StatsRow({
  totalExperiences,
  publishedCount,
  totalRSVPs,
  responseRate,
}: StatsRowProps) {
  const stats = [
    { icon: Calendar, label: "Total Experiences", value: totalExperiences, color: "#6C47FF", bg: "#F0EDFF" },
    { icon: CheckCircle2, label: "Published", value: publishedCount, color: "#16A34A", bg: "#EAFBF0" },
    { icon: Users, label: "Total RSVPs", value: totalRSVPs, color: "#FF9A49", bg: "#FFF1E5" },
    { icon: TrendingUp, label: "Response Rate", value: `${responseRate}%`, color: "#8EA6FF", bg: "#EEF1FF" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-gray-100 radius-md p-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ backgroundColor: s.bg }}
          >
            <s.icon size={18} style={{ color: s.color }} />
          </div>
          <p className="text-2xl font-bold text-ink">{s.value}</p>
          <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
