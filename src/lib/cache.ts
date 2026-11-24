export const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

export const getLocalCache = (key: string) => {
  try {
    const raw = localStorage.getItem(`portfolio_cache_${key}`);
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    return { isFresh: Date.now() - timestamp < CACHE_TTL_MS, data };
  } catch {
    return null;
  }
};

export const setLocalCache = (key: string, data: unknown) => {
  try {
    localStorage.setItem(`portfolio_cache_${key}`, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (error) {
    console.warn("Cache write error:", error);
  }
};
