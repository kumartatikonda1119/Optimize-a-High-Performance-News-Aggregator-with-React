import { providers } from "./providers.js";

const dedupe = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
};

export const fetchNewsPage = async ({
  query,
  category,
  country,
  page,
  pageSize,
}) => {
  const results = [];

  for (const provider of providers) {
    const data = await provider({ query, category, country, page, pageSize });
    if (data?.length) {
      results.push(...data);
    }
  }

  const merged = dedupe(results);
  const sliced = merged.slice(0, pageSize);
  return {
    items: sliced,
    nextPage: merged.length >= pageSize ? page + 1 : null,
  };
};
