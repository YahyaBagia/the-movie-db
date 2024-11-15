import { useEffect, useState, useCallback, useRef } from "react";
import { useLocalSearchParams } from "expo-router";

import MovieAPIs from "@/src/apis/movie";
import {
  ICredits,
  IKeywordsResponse,
  IMovieDetails,
  IMovieImages,
} from "@/src/apis/movie/interfaces";
import { IMediaList } from "@/src/apis/interfaces";
import { IAccountState, IMovieRated } from "@/src/apis/rating/interfaces";
import RatingAPIs from "@/src/apis/rating";
import { PostRatingBottomSheetRef } from "@/src/screens/main/movie/components/PostRatingBottomSheet";
import WatchlistAPIs from "@/src/apis/watchlist";

const useMovieDetailsController = () => {
  const { movie_id } = useLocalSearchParams<{ movie_id: string }>();

  const [details, setDetails] = useState<IMovieDetails | null>(null);
  const [images, setImages] = useState<IMovieImages | null>(null);
  const [recommendations, setRecommendations] = useState<IMediaList | null>(
    null
  );
  const [similarMovies, setSimilarMovies] = useState<IMediaList | null>(null);
  const [credits, setCredits] = useState<ICredits | null>(null);
  const [accountState, setAccountState] = useState<IAccountState | null>(null);
  const [keywords, setKeywords] = useState<IKeywordsResponse | null>(null);

  const [loadingStates, setLoadingStates] = useState({
    details: false,
    images: false,
    recommendations: false,
    similarMovies: false,
    credits: false,
    accountState: false,
    keyowords: false,
  });

  const [errorStates, setErrorStates] = useState({
    details: null,
    images: null,
    recommendations: null,
    similarMovies: null,
    credits: null,
    accountState: null,
    keyowords: null,
  });

  const postRatingBottomSheetRef = useRef<PostRatingBottomSheetRef>(null);

  const updateLoadingState = (
    key: keyof typeof loadingStates,
    value: boolean
  ) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  };

  const updateErrorState = (
    key: keyof typeof errorStates,
    value: string | null
  ) => {
    setErrorStates((prev) => ({ ...prev, [key]: value }));
  };

  const fetchDetails = useCallback(async () => {
    if (!movie_id) return;
    updateLoadingState("details", true);
    updateErrorState("details", null);
    try {
      const fetchedDetails = await MovieAPIs.fetchDetails(Number(movie_id));
      setDetails(fetchedDetails);
    } catch (err: any) {
      updateErrorState("details", err.message || "Failed to fetch details");
    } finally {
      updateLoadingState("details", false);
    }
  }, [movie_id]);

  const fetchImages = useCallback(async () => {
    if (!movie_id) return;
    updateLoadingState("images", true);
    updateErrorState("images", null);
    try {
      const fetchedImages = await MovieAPIs.fetchImages(Number(movie_id));
      setImages(fetchedImages);
    } catch (err: any) {
      updateErrorState("images", err.message || "Failed to fetch images");
    } finally {
      updateLoadingState("images", false);
    }
  }, [movie_id]);

  const fetchKeywords = useCallback(async () => {
    if (!movie_id) return;
    updateLoadingState("keyowords", true);
    updateErrorState("keyowords", null);
    try {
      const fetchedKeywords = await MovieAPIs.fetchKeywords(Number(movie_id));
      setKeywords(fetchedKeywords);
    } catch (err: any) {
      updateErrorState("keyowords", err.message || "Failed to fetch keywords");
    } finally {
      updateLoadingState("keyowords", false);
    }
  }, [movie_id]);

  const fetchRecommendations = useCallback(async () => {
    if (!movie_id) return;
    updateLoadingState("recommendations", true);
    updateErrorState("recommendations", null);
    try {
      const fetchedRecommendations = await MovieAPIs.fetchRecommendations(
        Number(movie_id),
        1
      );
      setRecommendations(fetchedRecommendations);
    } catch (err: any) {
      updateErrorState(
        "recommendations",
        err.message || "Failed to fetch recommendations"
      );
    } finally {
      updateLoadingState("recommendations", false);
    }
  }, [movie_id]);

  const fetchSimilarMovies = useCallback(async () => {
    if (!movie_id) return;
    updateLoadingState("similarMovies", true);
    updateErrorState("similarMovies", null);
    try {
      const fetchedSimilarMovies = await MovieAPIs.fetchSimilarMovies(
        Number(movie_id),
        1
      );
      setSimilarMovies(fetchedSimilarMovies);
    } catch (err: any) {
      updateErrorState(
        "similarMovies",
        err.message || "Failed to fetch similar movies"
      );
    } finally {
      updateLoadingState("similarMovies", false);
    }
  }, [movie_id]);

  const fetchCredits = useCallback(async () => {
    if (!movie_id) return;
    updateLoadingState("credits", true);
    updateErrorState("credits", null);
    try {
      const fetchedCredits = await MovieAPIs.fetchCredits(Number(movie_id));
      setCredits(fetchedCredits);
    } catch (err: any) {
      updateErrorState("credits", err.message || "Failed to fetch credits");
    } finally {
      updateLoadingState("credits", false);
    }
  }, [movie_id]);

  const fetchRating = useCallback(async () => {
    if (!movie_id) return;
    updateLoadingState("accountState", true);
    updateErrorState("accountState", null);
    try {
      const fetchedAccountState = await RatingAPIs.fetchRating(
        Number(movie_id)
      );
      setAccountState(fetchedAccountState);
    } catch (err: any) {
      updateErrorState(
        "accountState",
        err.message || "Failed to fetch account state"
      );
    } finally {
      updateLoadingState("accountState", false);
    }
  }, [movie_id]);

  useEffect(() => {
    fetchDetails();
    fetchImages();
    fetchRecommendations();
    fetchSimilarMovies();
    fetchCredits();
    fetchRating();
    fetchKeywords();
  }, [
    fetchDetails,
    fetchImages,
    fetchRecommendations,
    fetchSimilarMovies,
    fetchCredits,
    fetchRating,
    fetchKeywords,
  ]);

  const openRatingBottomSheet = () => {
    let value = 0;
    if (accountState?.rated) {
      value = (accountState?.rated as IMovieRated).value;
    }

    postRatingBottomSheetRef.current?.openBottomSheet({
      value,
      onSubmit: async (rating) => {
        await RatingAPIs.addRating(Number(movie_id), rating);
        await fetchRating();
      },
      onDelete: async () => {
        await RatingAPIs.deleteRating(Number(movie_id));
        await fetchRating();
      },
    });
  };

  const onPressToggleWatchlist = async () => {
    if (!movie_id) return;

    const isAdded = accountState?.watchlist;
    if (isAdded) {
      await WatchlistAPIs.removeFromWatchlist(Number(movie_id));
    } else {
      await WatchlistAPIs.addToWatchlist(Number(movie_id));
    }

    await fetchRating();
  };

  return {
    details,
    images,
    recommendations,
    similarMovies,
    credits,
    accountState,
    keywords,
    loadingStates,
    errorStates,
    refetch: {
      fetchDetails,
      fetchImages,
      fetchRecommendations,
      fetchSimilarMovies,
      fetchCredits,
      fetchRating,
      fetchKeywords,
    },
    openRatingBottomSheet,
    postRatingBottomSheetRef,
    onPressToggleWatchlist,
  };
};

export default useMovieDetailsController;
