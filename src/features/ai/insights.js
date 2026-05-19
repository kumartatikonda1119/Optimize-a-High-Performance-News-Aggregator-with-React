import { extractKeywords } from "../../utils/text.js";

export function buildInsightCards(articles) {
  const keywords = extractKeywords(
    articles.map((article) => article.title).join(" "),
    5,
  );

  return keywords.map((keyword, index) => ({
    id: `${keyword}-${index}`,
    title: `Signal: ${keyword}`,
    description: `Momentum rising across ${keyword} narratives with elevated media velocity.`,
  }));
}
