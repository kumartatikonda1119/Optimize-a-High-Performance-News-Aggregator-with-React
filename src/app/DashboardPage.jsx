import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useNewsFeed } from "../hooks/useNewsFeed.js";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

function aggregateBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "Unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function toChartData(record) {
  return Object.entries(record).map(([name, value]) => ({ name, value }));
}

function DashboardPage() {
  const { data } = useNewsFeed({
    query: "",
    category: "business",
    country: "us",
    pageSize: 24,
  });

  const articles = data?.pages?.flatMap((page) => page.items) ?? [];

  const sourceData = useMemo(
    () => toChartData(aggregateBy(articles, "source")).slice(0, 6),
    [articles],
  );
  const sentimentData = useMemo(
    () => toChartData(aggregateBy(articles, "sentiment")),
    [articles],
  );
  const categoryData = useMemo(
    () => toChartData(aggregateBy(articles, "category")).slice(0, 6),
    [articles],
  );
  const countryData = useMemo(
    () => toChartData(aggregateBy(articles, "country")).slice(0, 6),
    [articles],
  );

  const timelineData = useMemo(() => {
    return articles.slice(0, 10).map((article, index) => ({
      name: `Pulse ${index + 1}`,
      value: Math.min(100, 40 + article.keywords.length * 6),
    }));
  }, [articles]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Analytics
        </p>
        <h2 className="text-3xl text-white">Signal intelligence dashboard</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="min-h-[320px]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white">Narrative velocity</h3>
            <Badge variant="glow">Live</Badge>
          </div>
          <div className="mt-6 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="pulse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c5cff" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#7c5cff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2430" />
                <XAxis dataKey="name" stroke="#667085" />
                <YAxis stroke="#667085" />
                <Tooltip
                  contentStyle={{ background: "#0f131b", border: "none" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#7c5cff"
                  fill="url(#pulse)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="min-h-[320px]">
          <h3 className="text-lg text-white">Sentiment split</h3>
          <div className="mt-6 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  fill="#6dd3ff"
                  label
                />
                <Tooltip
                  contentStyle={{ background: "#0f131b", border: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="min-h-[280px]">
          <h3 className="text-lg text-white">Top sources</h3>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2430" />
                <XAxis dataKey="name" stroke="#667085" />
                <YAxis stroke="#667085" />
                <Tooltip
                  contentStyle={{ background: "#0f131b", border: "none" }}
                />
                <Bar dataKey="value" fill="#6dd3ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="min-h-[280px]">
          <h3 className="text-lg text-white">Category distribution</h3>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2430" />
                <XAxis dataKey="name" stroke="#667085" />
                <YAxis stroke="#667085" />
                <Tooltip
                  contentStyle={{ background: "#0f131b", border: "none" }}
                />
                <Bar dataKey="value" fill="#7c5cff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="min-h-[240px]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-white">Geo signal map</h3>
          <Badge variant="glow">Country focus</Badge>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countryData.map((country) => (
            <div
              key={country.name}
              className="glass flex items-center justify-between rounded-2xl px-4 py-3"
            >
              <span className="text-sm text-white/70">{country.name}</span>
              <span className="text-sm font-semibold text-white">
                {country.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default DashboardPage;
