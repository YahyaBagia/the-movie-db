import { useLocalSearchParams } from "expo-router";

const useMovieDetailsController = () => {
  const { movie_id } = useLocalSearchParams<{ movie_id: string }>();

  console.log({ movie_id });

  // details
  // images
  // videos
  // reviews
  // rating

  return {};
};

export default useMovieDetailsController;
