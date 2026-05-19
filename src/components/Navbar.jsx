import { motion } from "framer-motion";
import { Sparkles, LayoutGrid, Radar, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { cn } from "../utils/cn.js";

const navItems = [
  { id: "home", label: "Home", icon: Sparkles },
  { id: "discover", label: "Discover", icon: LayoutGrid },
  { id: "dashboard", label: "Dashboard", icon: Radar },
];

function Navbar({ activePage, onChange, onToggleTheme, visible }) {
  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed left-0 right-0 top-0 z-40 px-6 py-4 sm:px-10"
    >
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-glow" />
          <div>
            <p className="text-sm font-semibold text-white">AetherLens</p>
            <p className="text-xs text-white/50">AI News Studio</p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onToggleTheme}>
            <Sun className="h-4 w-4" />
            <Moon className="ml-2 h-4 w-4" />
          </Button>
          <Button className="hidden sm:inline-flex">Launch Briefing</Button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </motion.header>
  );
}

export default Navbar;
