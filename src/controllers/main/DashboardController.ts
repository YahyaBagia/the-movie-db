import { useState } from "react";

import { TimeFrame } from "@/src/apis/interfaces";

import useTrendingMediaController from "./TrendingMediaController";

const useDashboardController = () => {
  const [selectedTimeFrameMovie, setSelectedTimeFrameMovie] =
    useState<TimeFrame>("day");
  const [selectedTimeFrameTV, setSelectedTimeFrameTV] =
    useState<TimeFrame>("day");

  const {
    isLoading: isLoadingMovie,
    loadMore: loadMoreMovie,
    trendingMedia: trendingMovie,
  } = useTrendingMediaController("movie", selectedTimeFrameMovie);

  const {
    isLoading: isLoadingTv,
    loadMore: loadMoreTv,
    trendingMedia: trendingTv,
  } = useTrendingMediaController("tv", selectedTimeFrameTV);

  return {
    selectedTimeFrameMovie,
    selectedTimeFrameTV,
    setSelectedTimeFrameMovie,
    setSelectedTimeFrameTV,
    isLoadingMovie,
    isLoadingTv,
    loadMoreMovie,
    loadMoreTv,
    trendingMovie,
    trendingTv,
  };
};

export default useDashboardController;
