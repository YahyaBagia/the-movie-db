import { useState, useCallback, useEffect } from "react";

import WatchlistAPIs from "@/src/apis/watchlist";
import { IMediaList } from "@/src/apis/interfaces";

export const useWatchlistController = () => {
  const [watchlist, setWatchlist] = useState<IMediaList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWatchlist = useCallback(async (page: number = 1) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await WatchlistAPIs.fetchWatchlistMovies(page);

      setWatchlist((prev) => ({
        ...data,
        results:
          page === 1
            ? data.results
            : [...(prev?.results || []), ...data.results],
      }));

      setCurrentPage(page);
      setHasMore(page < data.total_pages);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch watchlist");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNextPage = useCallback(() => {
    if (hasMore && !loading) {
      fetchWatchlist(currentPage + 1);
    }
  }, [currentPage, hasMore, fetchWatchlist, loading]);

  useEffect(() => {
    fetchWatchlist(1);
  }, [fetchWatchlist]);

  return {
    watchlist,
    loading,
    error,
    fetchWatchlist,
    fetchNextPage,
    hasMore,
  };
};
