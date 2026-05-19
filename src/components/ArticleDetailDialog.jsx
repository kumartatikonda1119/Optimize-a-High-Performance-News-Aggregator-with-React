import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bookmark, Heart, Share2, X } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { formatDate } from "../utils/date.js";
import { usePreferencesStore } from "../store/preferencesStore.js";

function ArticleDetailDialog({ article, onClose }) {
  const { toggleBookmark, toggleLike, bookmarks, likes, addToHistory } =
    usePreferencesStore();
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  if (!article) {
    return null;
  }

  const isBookmarked = bookmarks.some((item) => item.id === article.id);
  const isLiked = likes.some((item) => item.id === article.id);

  const handleOpenChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }

    const handleScroll = () => {
      const max = node.scrollHeight - node.clientHeight;
      const ratio = max > 0 ? node.scrollTop / max : 0;
      setProgress(Math.min(100, Math.round(ratio * 100)));
    };

    handleScroll();
    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, [article]);

  useEffect(() => {
    if (article) {
      addToHistory(article);
    }
  }, [addToHistory, article]);

  return (
    <Dialog.Root open={!!article} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-paper">
          <div className="h-1 w-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-accent via-glow to-coral"
              style={{ width: `${progress}%` }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid max-h-[85vh] grid-cols-1 gap-0 overflow-y-auto md:grid-cols-[1.1fr_0.9fr]"
            ref={contentRef}
          >
            <div className="relative min-h-[280px]">
              {article.imageUrl ? (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/30 via-glow/20 to-coral/20 text-xs uppercase tracking-[0.4em] text-white/60">
                  No image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                <Badge variant={article.sentiment}>{article.sentiment}</Badge>
                <Badge variant="glow">{article.readingTime} min read</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {article.source}
                  </p>
                  <h2 className="mt-3 text-2xl text-white">{article.title}</h2>
                </div>
                <Dialog.Close asChild>
                  <button className="rounded-full border border-white/10 p-2 text-white/60">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <p className="text-sm text-white/70">{article.description}</p>

              <div className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  AI Summary
                </p>
                <p className="mt-2 text-sm text-white/80">{article.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <Badge key={keyword} variant="default">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="glass sticky top-6 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Share suite
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard?.writeText(article.url)}
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Copy link
                  </Button>
                </div>
                <div className="mt-4 text-xs text-white/50">
                  Source: {article.source}
                </div>
              </div>

              <div className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Related articles
                </p>
                <div className="mt-3 grid gap-3">
                  {article.keywords.slice(0, 3).map((keyword) => (
                    <div
                      key={keyword}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
                    >
                      {`Briefing: ${keyword} narrative acceleration`}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/40">
                <span>{formatDate(article.publishedAt)}</span>
                <span>{article.author}</span>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toggleBookmark(article);
                    addToHistory(article);
                  }}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(article)}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button asChild size="sm">
                  <a href={article.url} target="_blank" rel="noreferrer">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Open source
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ArticleDetailDialog;
