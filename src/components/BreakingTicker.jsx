import { motion } from "framer-motion";

function BreakingTicker({ items }) {
  if (!items?.length) {
    return null;
  }

  const doubled = [...items, ...items];

  return (
    <div className="glass overflow-hidden rounded-full border border-white/10 px-4 py-3">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
        <span className="h-2 w-2 rounded-full bg-coral shadow-glow" />
        Breaking
      </div>
      <motion.div className="mt-2 overflow-hidden">
        <div className="flex w-[200%] gap-8 whitespace-nowrap text-sm text-white/80 animate-ticker">
          {doubled.map((item, index) => (
            <span
              key={`${item.id}-${index}`}
              className="flex items-center gap-2"
            >
              <span className="text-white/40">//</span>
              {item.title}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default BreakingTicker;
