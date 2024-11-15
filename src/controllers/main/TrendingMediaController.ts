import { useState, useEffect, useCallback } from "react";

import TrendingAPIs from "@/src/apis/trending";
import { IMediaItem } from "@/src/apis/interfaces";

interface UseDashboardControllerResult {
  trendingMedia: IMediaItem[];
  isLoading: boolean;
  isError: boolean;
  loadMore: () => void;
}

const useTrendingMediaController = (
  mediaType: "movie" | "tv",
  timeFrame: "day" | "week"
): UseDashboardControllerResult => {
  const [trendingMedia, setTrendingMedia] = useState<IMediaItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Fetch trending media with pagination support
  const fetchTrendingMedia = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await TrendingAPIs.getTrending(
        timeFrame,
        mediaType,
        currentPage
      );
      setTrendingMedia((prevMedia) => [...prevMedia, ...response.results]);
    } catch (error) {
      console.error("Failed to fetch trending media:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [mediaType, timeFrame, currentPage]);

  // Fetch the initial data on mount and when mediaType or timeFrame changes
  useEffect(() => {
    setTrendingMedia([]); // Reset list when mediaType or timeFrame changes
    setCurrentPage(1); // Reset to page 1 for new filters
    fetchTrendingMedia(); // Fetch the first page
  }, [mediaType, timeFrame]);

  // Load more items for pagination
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Fetch data when currentPage changes (for loading more items)
  useEffect(() => {
    if (currentPage > 1) {
      fetchTrendingMedia();
    }
  }, [currentPage]);

  return {
    trendingMedia,
    isLoading,
    isError,
    loadMore,
  };
};

export default useTrendingMediaController;
