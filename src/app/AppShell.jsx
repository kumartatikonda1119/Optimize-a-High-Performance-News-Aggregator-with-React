import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePreferencesStore } from "../store/preferencesStore.js";
import { fadeUp } from "../animations/variants.js";
import Navbar from "../components/Navbar.jsx";
import HomePage from "./HomePage.jsx";
import DiscoverPage from "./DiscoverPage.jsx";
import DashboardPage from "./DashboardPage.jsx";
import ArticleDetailDialog from "../components/ArticleDetailDialog.jsx";

const pages = {
  home: HomePage,
  discover: DiscoverPage,
  dashboard: DashboardPage,
};

function AppShell() {
  const [activePage, setActivePage] = useState("home");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { theme, toggleTheme } = usePreferencesStore();
  const { scrollY } = useScroll();

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current < 80) {
      setNavVisible(true);
      return;
    }
    setNavVisible(current < previous);
  });

  useEffect(() => {
    const handleMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const Page = useMemo(() => pages[activePage], [activePage]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-80" />
      <div
        className="pointer-events-none fixed z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/20 blur-3xl"
        style={{ left: cursor.x, top: cursor.y }}
      />
      <div className="pointer-events-none absolute left-[15%] top-[20%] h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute right-[10%] top-[55%] h-56 w-56 rounded-full bg-coral/20 blur-3xl animate-float" />
      <Navbar
        activePage={activePage}
        onChange={setActivePage}
        onToggleTheme={toggleTheme}
        visible={navVisible}
      />
      <main className="relative z-10 px-6 pb-24 pt-28 sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            variants={fadeUp}
          >
            <Page onSelectArticle={setSelectedArticle} />
          </motion.div>
        </AnimatePresence>
      </main>

      <ArticleDetailDialog
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

export default AppShell;
