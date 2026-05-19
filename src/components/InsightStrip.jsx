import { Badge } from "./ui/badge.jsx";

function InsightStrip({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="glass flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 px-6 py-4">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        AI insights
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="glow">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default InsightStrip;
