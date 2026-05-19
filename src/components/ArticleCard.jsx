import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { formatDate } from "../utils/date.js";
import { usePreferencesStore } from "../store/preferencesStore.js";

function ArticleCard({ article, onSelect, variant = "grid" }) {
  const { toggleBookmark, toggleLike, bookmarks, likes } =
    usePreferencesStore();
  const isBookmarked = bookmarks.some((item) => item.id === article.id);
  const isLiked = likes.some((item) => item.id === article.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10"
    >
      <button
        className="relative h-44 w-full overflow-hidden"
        onClick={() => onSelect(article)}
      >
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/30 via-glow/20 to-coral/20 text-xs uppercase tracking-[0.4em] text-white/60">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <Badge variant={article.sentiment}>{article.sentiment}</Badge>
          <Badge variant="glow">{article.readingTime} min read</Badge>
        </div>
      </button>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              {article.source}
            </p>
            <h3 className="mt-2 text-lg text-white line-clamp-2">
              {article.title}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={`rounded-full border border-white/10 p-2 text-white/60 transition hover:text-white ${
                isBookmarked ? "bg-white/10 text-white" : ""
              }`}
              onClick={() => toggleBookmark(article)}
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button
              className={`rounded-full border border-white/10 p-2 text-white/60 transition hover:text-white ${
                isLiked ? "bg-white/10 text-white" : ""
              }`}
              onClick={() => toggleLike(article)}
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-white/60 line-clamp-3">{article.summary}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-white/40">
          <span>{formatDate(article.publishedAt)}</span>
          <span className="uppercase tracking-[0.3em]">{article.category}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default ArticleCard;
