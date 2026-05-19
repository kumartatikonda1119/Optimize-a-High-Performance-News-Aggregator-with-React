import { Grid2x2, List, LayoutPanelTop } from "lucide-react";
import { usePreferencesStore } from "../store/preferencesStore.js";
import { cn } from "../utils/cn.js";

const options = [
  { id: "grid", icon: Grid2x2 },
  { id: "masonry", icon: LayoutPanelTop },
  { id: "list", icon: List },
];

function LayoutSwitch() {
  const { layout, setLayout } = usePreferencesStore();

  return (
    <div className="glass flex items-center gap-2 rounded-full border border-white/10 p-2">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            className={cn(
              "rounded-full p-2 text-white/50 transition hover:text-white",
              layout === option.id ? "bg-white/10 text-white" : "",
            )}
            onClick={() => setLayout(option.id)}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

export default LayoutSwitch;
