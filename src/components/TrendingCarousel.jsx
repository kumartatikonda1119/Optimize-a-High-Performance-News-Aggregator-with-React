import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function TrendingCarousel({ items, onSelect }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {items.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ y: -6 }}
          className="glass min-w-[260px] rounded-3xl border border-white/10 p-5 text-left"
          onClick={() => onSelect(item)}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Trending
            </p>
            <ArrowUpRight className="h-4 w-4 text-white/60" />
          </div>
          <h3 className="mt-4 text-lg text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-white/60 line-clamp-3">
            {item.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
}

export default TrendingCarousel;
