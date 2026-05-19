import {
  analyzeSentiment,
  estimateReadingTime,
  extractKeywords,
  summarizeText,
} from "../../utils/text.js";

const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY;
const GNEWS_KEY = import.meta.env.VITE_GNEWS_KEY;
const GUARDIAN_KEY = import.meta.env.VITE_GUARDIAN_KEY;
const NYT_KEY = import.meta.env.VITE_NYT_KEY;
const MEDIASTACK_KEY = import.meta.env.VITE_MEDIASTACK_KEY;

const NEWSAPI_URL = "https://newsapi.org/v2";
const GNEWS_URL = "https://gnews.io/api/v4";
const GUARDIAN_URL = "https://content.guardianapis.com";
const NYT_URL = "https://api.nytimes.com/svc";
const MEDIASTACK_URL = "https://api.mediastack.com/v1";

const toTimestamp = (value) => (value ? new Date(value).toISOString() : null);
const buildParams = (params) =>
  new URLSearchParams(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

const normalize = (item) => {
  const title = item.title || "Untitled";
  const description = item.description || item.summary || "";
  const summary = summarizeText(description);
  const keywords = extractKeywords(`${title} ${description}`);
  const sentiment = analyzeSentiment(`${title} ${description}`);
  const readingTime = estimateReadingTime(`${title} ${description}`);

  return {
    id: item.id,
    title,
    description,
    summary,
    url: item.url,
    imageUrl: item.imageUrl,
    source: item.source,
    author: item.author || "Newswire",
    publishedAt: toTimestamp(item.publishedAt) || new Date().toISOString(),
    category: item.category || "general",
    country: item.country || "us",
    sentiment,
    keywords,
    readingTime,
  };
};

const safeFetch = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchFromNewsApi = async ({
  query,
  category,
  country,
  page,
  pageSize,
}) => {
  if (!NEWSAPI_KEY) {
    return [];
  }
  const params = buildParams({
    apiKey: NEWSAPI_KEY,
    q: query || undefined,
    category: category || undefined,
    country: country || "us",
    page: String(page),
    pageSize: String(pageSize),
  });
  const data = await safeFetch(`${NEWSAPI_URL}/top-headlines?${params}`);
  if (!data?.articles) {
    return [];
  }
  return data.articles.map((article) =>
    normalize({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source?.name || "NewsAPI",
      author: article.author,
      publishedAt: article.publishedAt,
      category,
      country,
    }),
  );
};

export const fetchFromGNews = async ({
  query,
  category,
  country,
  page,
  pageSize,
}) => {
  if (!GNEWS_KEY) {
    return [];
  }
  const params = buildParams({
    apikey: GNEWS_KEY,
    q: query || undefined,
    topic: category || undefined,
    country: country || "us",
    max: String(pageSize),
    page: String(page),
    lang: "en",
  });
  const data = await safeFetch(`${GNEWS_URL}/top-headlines?${params}`);
  if (!data?.articles) {
    return [];
  }
  return data.articles.map((article) =>
    normalize({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.image,
      source: article.source?.name || "GNews",
      author: article.source?.name,
      publishedAt: article.publishedAt,
      category,
      country,
    }),
  );
};

export const fetchFromGuardian = async ({
  query,
  category,
  page,
  pageSize,
}) => {
  if (!GUARDIAN_KEY) {
    return [];
  }
  const params = buildParams({
    "api-key": GUARDIAN_KEY,
    q: query || undefined,
    section: category || undefined,
    page: String(page),
    "page-size": String(pageSize),
    "show-fields": "thumbnail,trailText,byline",
  });
  const data = await safeFetch(`${GUARDIAN_URL}/search?${params}`);
  if (!data?.response?.results) {
    return [];
  }
  return data.response.results.map((article) =>
    normalize({
      id: article.id,
      title: article.webTitle,
      description: article.fields?.trailText,
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      source: "The Guardian",
      author: article.fields?.byline,
      publishedAt: article.webPublicationDate,
      category: article.sectionName?.toLowerCase() || category,
    }),
  );
};

export const fetchFromNYTimes = async ({ category }) => {
  if (!NYT_KEY) {
    return [];
  }
  const section = category || "home";
  const data = await safeFetch(
    `${NYT_URL}/topstories/v2/${section}.json?api-key=${NYT_KEY}`,
  );
  if (!data?.results) {
    return [];
  }
  return data.results.map((article) =>
    normalize({
      id: article.url,
      title: article.title,
      description: article.abstract,
      url: article.url,
      imageUrl: article.multimedia?.[0]?.url,
      source: "NYTimes",
      author: article.byline,
      publishedAt: article.published_date,
      category: article.section,
      country: "us",
    }),
  );
};

export const fetchFromMediastack = async ({
  query,
  category,
  country,
  page,
  pageSize,
}) => {
  if (!MEDIASTACK_KEY) {
    return [];
  }
  const params = buildParams({
    access_key: MEDIASTACK_KEY,
    keywords: query || undefined,
    categories: category || undefined,
    countries: country || undefined,
    limit: String(pageSize),
    offset: String((page - 1) * pageSize),
    languages: "en",
  });
  const data = await safeFetch(`${MEDIASTACK_URL}/news?${params}`);
  if (!data?.data) {
    return [];
  }
  return data.data.map((article) =>
    normalize({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.image,
      source: article.source || "Mediastack",
      author: article.author,
      publishedAt: article.published_at,
      category: article.category,
      country: article.country,
    }),
  );
};

export const providers = [
  fetchFromNewsApi,
  fetchFromGNews,
  fetchFromGuardian,
  fetchFromNYTimes,
  fetchFromMediastack,
];
