import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useNewsFeed } from "../hooks/useNewsFeed.js";
import { Button } from "../components/ui/button.jsx";
import BreakingTicker from "../components/BreakingTicker.jsx";
import TrendingCarousel from "../components/TrendingCarousel.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { staggerContainer, fadeUp } from "../animations/variants.js";
import { buildInsightCards } from "../features/ai/insights.js";

const categoryCards = [
  { title: "Market Pulse", description: "Signals from global exchanges." },
  { title: "Tech Frontier", description: "AI, chips, and frontier labs." },
  { title: "Policy Watch", description: "Geopolitics and regulation." },
  { title: "Climate Alpha", description: "Energy and resilience." },
];

function HomePage({ onSelectArticle }) {
  const { data, isLoading } = useNewsFeed({
    query: "",
    category: "technology",
    country: "us",
    pageSize: 10,
  });

  const articles = data?.pages?.flatMap((page) => page.items) ?? [];
  const trending = articles.slice(0, 5);
  const featured = articles.slice(5, 9);
  const insightCards = buildInsightCards(articles);
  const heroImageUrl = trending[0]?.imageUrl ?? "/hero-fallback.svg";
  const heroTitle = trending[0]?.title ?? "AetherLens hero";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Intelligence layer for modern newsrooms
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            <span className="text-gradient">AetherLens</span> turns the global
            news feed into live, AI-guided strategy.
          </h1>
          <p className="text-lg text-white/70">
            Blend five premium news sources, discover sentiment, and track
            emerging narratives in a single cinematic interface.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button className="halo">Start live briefing</Button>
            <Button variant="ghost">Watch product tour</Button>
          </div>
          <BreakingTicker items={trending} />
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6"
        >
          <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3 w-3" />
            Live signal
          </div>
          {isLoading ? (
            <Skeleton className="h-[360px] w-full" />
          ) : (
            <img
              src={heroImageUrl}
              alt={heroTitle}
              className="h-[360px] w-full rounded-2xl object-cover"
            />
          )}
          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Featured
            </p>
            <h2 className="text-2xl text-white">
              {trending[0]?.title || "Streaming the pulse of global markets"}
            </h2>
            <p className="text-sm text-white/60">
              {trending[0]?.summary ||
                "Curated intelligence briefs and trendlines update every minute."}
            </p>
            <Button variant="outline" size="sm">
              Explore briefing <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-white">Trending streams</h2>
          <p className="text-sm text-white/50">Curated by AI heuristics</p>
        </div>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        ) : (
          <TrendingCarousel items={trending} onSelect={onSelectArticle} />
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {categoryCards.map((card) => (
          <div key={card.title} className="glass rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              {card.title}
            </p>
            <h3 className="mt-4 text-xl text-white">{card.description}</h3>
            <p className="mt-3 text-sm text-white/60">
              Curated signals, anomaly detection, and context-aware summaries.
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white">Featured intelligence</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-64" />
              ))
            : featured.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={onSelectArticle}
                />
              ))}
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {insightCards.map((card) => (
          <div key={card.id} className="glass rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              AI Insight
            </p>
            <h3 className="mt-4 text-xl text-white">{card.title}</h3>
            <p className="mt-3 text-sm text-white/60">{card.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
