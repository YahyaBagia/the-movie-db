import { useEffect, useState, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";

import MovieAPIs from "@/src/apis/movie";
import {
  ICredits,
  IMovieDetails,
  IMovieImages,
} from "@/src/apis/movie/interfaces";
import { IMediaList } from "@/src/apis/interfaces";

const useMovieDetailsController = () => {
  const { movie_id } = useLocalSearchParams<{ movie_id: string }>();

  const [details, setDetails] = useState<IMovieDetails | null>(null);
  const [images, setImages] = useState<IMovieImages | null>(null);
  const [recommendations, setRecommendations] = useState<IMediaList | null>(
    null
  );
  const [similarMovies, setSimilarMovies] = useState<IMediaList | null>(null);
  const [credits, setCredits] = useState<ICredits | null>(null);

  const [loadingStates, setLoadingStates] = useState({
    details: false,
    images: false,
    recommendations: false,
    similarMovies: false,
    credits: false,
  });

  const [errorStates, setErrorStates] = useState({
    details: null,
    images: null,
    recommendations: null,
    similarMovies: null,
    credits: null,
  });

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

  useEffect(() => {
    fetchDetails();
    fetchImages();
    fetchRecommendations();
    fetchSimilarMovies();
    fetchCredits();
  }, [
    fetchDetails,
    fetchImages,
    fetchRecommendations,
    fetchSimilarMovies,
    fetchCredits,
  ]);

  return {
    details,
    images,
    recommendations,
    similarMovies,
    credits,
    loadingStates,
    errorStates,
    refetch: {
      fetchDetails,
      fetchImages,
      fetchRecommendations,
      fetchSimilarMovies,
      fetchCredits,
    },
  };
};

export default useMovieDetailsController;
