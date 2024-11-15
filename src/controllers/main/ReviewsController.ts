import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import ReviewsAPIs from "@/src/apis/reviews";
import { IReviewsResponse } from "@/src/apis/reviews/interfaces";

export const useReviewsController = () => {
  const [reviews, setReviews] = useState<IReviewsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { movie_id } = useLocalSearchParams<{ movie_id: string }>();

  const fetchReviews = useCallback(async (page: number = 1) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await ReviewsAPIs.fetchMovieReviews(Number(movie_id), page);

      setReviews((prev) => ({
        ...data,
        results:
          page === 1
            ? data.results
            : [...(prev?.results || []), ...data.results],
      }));

      setCurrentPage(page);
      setHasMore(page < data.total_pages);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNextPage = useCallback(() => {
    if (hasMore && !loading) {
      fetchReviews(currentPage + 1);
    }
  }, [currentPage, hasMore, fetchReviews, loading]);

  useEffect(() => {
    fetchReviews(1);
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    fetchNextPage,
    hasMore,
  };
};

export default useReviewsController;
