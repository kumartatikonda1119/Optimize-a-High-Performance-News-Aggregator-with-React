import { useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import { useNewsFeed } from "../hooks/useNewsFeed.js";
import { useIntersection } from "../hooks/useIntersection.js";
import { usePreferencesStore } from "../store/preferencesStore.js";
import FiltersPanel from "../components/FiltersPanel.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import LayoutSwitch from "../components/LayoutSwitch.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import InsightStrip from "../components/InsightStrip.jsx";

const defaultFilters = {
  query: "",
  category: "general",
  country: "us",
  sort: "trending",
  source: "all",
  pageSize: 18,
};

const loadFilters = () => {
  const stored = sessionStorage.getItem("news-filters");
  if (!stored) {
    return defaultFilters;
  }
  try {
    return { ...defaultFilters, ...JSON.parse(stored) };
  } catch {
    return defaultFilters;
  }
};

const buildFallbackArticles = (count) =>
  Array.from({ length: count }).map((_, index) => ({
    id: `fallback-${index + 1}`,
    title: `Sample briefing ${index + 1}`,
    description:
      "Placeholder briefing used when API keys are not configured.",
    summary:
      "Configure API keys in .env to replace these placeholders with live news.",
    url: "https://news.ycombinator.com/",
    imageUrl: "/hero-fallback.svg",
    source: "Sample Feed",
    author: "Newswire",
    publishedAt: new Date(Date.now() - index * 36e5).toISOString(),
    category: "general",
    country: "us",
    sentiment: "neutral",
    keywords: ["sample", "news"],
    readingTime: 3,
  }));

function sortArticles(articles, mode) {
  if (mode === "latest") {
    return _.orderBy(articles, (article) => new Date(article.publishedAt), [
      "desc",
    ]);
  }
  if (mode === "impact") {
    return _.orderBy(articles, (article) => article.keywords?.length ?? 0, [
      "desc",
    ]);
  }
  return articles;
}

function DiscoverPage({ onSelectArticle }) {
  const [filters, setFilters] = useState(loadFilters);
  const { addSavedSearch, savedSearches, layout } = usePreferencesStore();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNewsFeed(filters);
  const loadMoreRef = useRef(null);
  const inView = useIntersection(loadMoreRef, { threshold: 0.4 });
  const fallbackArticles = useMemo(() => buildFallbackArticles(120), []);

  const articles = useMemo(() => {
    const merged = data?.pages?.flatMap((page) => page.items) ?? [];
    const filtered =
      filters.source === "all"
        ? merged
        : merged.filter((article) => article.source === filters.source);
    const sorted = sortArticles(filtered, filters.sort);
    if (!sorted.length && !isLoading) {
      return sortArticles(fallbackArticles, filters.sort);
    }
    return sorted;
  }, [data, fallbackArticles, filters.sort, filters.source, isLoading]);

  const insights = useMemo(() => {
    const keywords = articles.flatMap((article) => article.keywords || []);
    const counts = keywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([keyword]) => keyword);
  }, [articles]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  useEffect(() => {
    sessionStorage.setItem("news-filters", JSON.stringify(filters));
  }, [filters]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Discovery
          </p>
          <h2 className="text-3xl text-white">News discovery engine</h2>
        </div>
        <LayoutSwitch />
      </div>

      <FiltersPanel
        filters={filters}
        onChange={handleChange}
        onSaveSearch={() => addSavedSearch(filters.query || filters.category)}
      />

      {savedSearches.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-white/60">
          {savedSearches.map((search) => (
            <button
              key={search}
              className="rounded-full border border-white/10 px-3 py-1 hover:bg-white/10"
              onClick={() => handleChange("query", search)}
            >
              {search}
            </button>
          ))}
        </div>
      )}

      <InsightStrip items={insights} />

      <div
        className={`grid gap-6 ${
          layout === "masonry"
            ? "columns-1 sm:columns-2 lg:columns-3"
            : layout === "list"
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-72" />
          ))
        ) : articles.length ? (
          articles.map((article) => (
            <div
              key={article.id}
              className={layout === "masonry" ? "mb-6 break-inside-avoid" : ""}
            >
              <ArticleCard article={article} onSelect={onSelectArticle} />
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/60">
            No stories yet. Add API keys in .env to unlock the live feed.
          </div>
        )}
      </div>

      <div ref={loadMoreRef} className="py-8 text-center text-sm text-white/50">
        {isFetchingNextPage
          ? "Loading more intelligence..."
          : hasNextPage
            ? "Scroll for more"
            : "You are fully briefed"}
      </div>
    </div>
  );
}

export default DiscoverPage;
