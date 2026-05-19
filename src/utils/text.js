const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "that",
  "with",
  "this",
  "from",
  "your",
  "you",
  "are",
  "was",
  "were",
  "will",
  "about",
  "into",
  "over",
  "after",
  "before",
  "has",
  "have",
  "had",
  "but",
  "not",
  "its",
  "their",
  "they",
  "our",
  "out",
  "new",
  "how",
  "why",
  "what",
  "when",
  "where",
  "who",
  "all",
  "more",
  "most",
  "than",
  "just",
  "now",
  "then",
  "can",
  "could",
  "would",
  "should",
  "may",
  "might",
  "been",
  "being",
]);

const POSITIVE_WORDS = new Set([
  "surge",
  "soar",
  "growth",
  "record",
  "win",
  "success",
  "breakthrough",
  "boost",
  "strong",
  "gain",
  "expand",
  "bullish",
  "upgrade",
  "innovate",
]);

const NEGATIVE_WORDS = new Set([
  "drop",
  "fall",
  "decline",
  "risk",
  "cut",
  "loss",
  "crisis",
  "warning",
  "weak",
  "downgrade",
  "slow",
  "bearish",
  "halt",
]);

export function extractKeywords(text, limit = 6) {
  if (!text) {
    return [];
  }

  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((token) => token.length > 3 && !STOP_WORDS.has(token));

  const counts = tokens.reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([token]) => token);
}

export function summarizeText(text) {
  if (!text) {
    return "";
  }

  const trimmed = text.replace(/\s+/g, " ").trim();
  const sentenceMatch = trimmed.match(/[^.!?]+[.!?]/);
  return sentenceMatch ? sentenceMatch[0].trim() : trimmed;
}

export function estimateReadingTime(text) {
  if (!text) {
    return 1;
  }

  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function analyzeSentiment(text) {
  if (!text) {
    return "neutral";
  }

  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/);

  let score = 0;
  tokens.forEach((token) => {
    if (POSITIVE_WORDS.has(token)) {
      score += 1;
    }
    if (NEGATIVE_WORDS.has(token)) {
      score -= 1;
    }
  });

  if (score >= 2) {
    return "positive";
  }
  if (score <= -2) {
    return "negative";
  }
  return "neutral";
}
