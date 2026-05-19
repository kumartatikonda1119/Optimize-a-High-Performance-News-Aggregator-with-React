import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  theme: "dark",
  layout: "list",
  preferredCategories: ["technology", "business"],
  bookmarks: [],
  likes: [],
  history: [],
  savedSearches: [],
};

export const usePreferencesStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({ theme: get().theme === "dark" ? "light" : "dark" }),
      setLayout: (layout) => set({ layout }),
      toggleBookmark: (article) => {
        const bookmarks = get().bookmarks;
        const exists = bookmarks.find((item) => item.id === article.id);
        set({
          bookmarks: exists
            ? bookmarks.filter((item) => item.id !== article.id)
            : [...bookmarks, article],
        });
      },
      toggleLike: (article) => {
        const likes = get().likes;
        const exists = likes.find((item) => item.id === article.id);
        set({
          likes: exists
            ? likes.filter((item) => item.id !== article.id)
            : [...likes, article],
        });
      },
      addToHistory: (article) => {
        const history = get().history.filter((item) => item.id !== article.id);
        set({ history: [article, ...history].slice(0, 50) });
      },
      addSavedSearch: (search) => {
        const savedSearches = get().savedSearches;
        if (savedSearches.includes(search)) {
          return;
        }
        set({ savedSearches: [search, ...savedSearches].slice(0, 6) });
      },
      setPreferredCategories: (categories) =>
        set({ preferredCategories: categories }),
    }),
    {
      name: "news-aggregator-preferences",
      partialize: (state) => ({
        theme: state.theme,
        layout: state.layout,
        preferredCategories: state.preferredCategories,
        bookmarks: state.bookmarks,
        likes: state.likes,
        history: state.history,
        savedSearches: state.savedSearches,
      }),
    },
  ),
);
