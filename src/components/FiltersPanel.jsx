import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";

const categories = [
  "general",
  "technology",
  "business",
  "science",
  "health",
  "sports",
  "entertainment",
];

const countries = ["us", "gb", "in", "ca", "au", "de"];
const sources = [
  "all",
  "NewsAPI",
  "GNews",
  "The Guardian",
  "NYTimes",
  "Mediastack",
];

function FiltersPanel({ filters, onChange, onSaveSearch }) {
  return (
    <div className="glass grid gap-4 rounded-3xl border border-white/10 p-6 lg:grid-cols-[1.2fr_repeat(4,_minmax(0,_1fr))_auto]">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          placeholder="Search by topic, keyword, or company"
          className="pl-11"
          value={filters.query}
          onChange={(event) => onChange("query", event.target.value)}
        />
      </div>
      <select
        className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
        value={filters.category}
        onChange={(event) => onChange("category", event.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
        value={filters.country}
        onChange={(event) => onChange("country", event.target.value)}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country.toUpperCase()}
          </option>
        ))}
      </select>
      <select
        className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
        value={filters.sort}
        onChange={(event) => onChange("sort", event.target.value)}
      >
        <option value="trending">Trending</option>
        <option value="latest">Latest</option>
        <option value="impact">Impact</option>
      </select>
      <select
        className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
        value={filters.source}
        onChange={(event) => onChange("source", event.target.value)}
      >
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
      <Button variant="outline" size="sm" onClick={onSaveSearch}>
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Save
      </Button>
    </div>
  );
}

export default FiltersPanel;
