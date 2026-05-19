import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNewsPage } from "../services/news/index.js";

const DEFAULT_PAGE_SIZE = 18;
const REFRESH_MS = Number(import.meta.env.VITE_NEWS_REFRESH_MS ?? 0);

export function useNewsFeed(filters) {
  return useInfiniteQuery({
    queryKey: ["news", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchNewsPage({
        query: filters.query,
        category: filters.category,
        country: filters.country,
        page: pageParam,
        pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 4,
    refetchInterval: REFRESH_MS || false,
    retry: 2,
  });
}
