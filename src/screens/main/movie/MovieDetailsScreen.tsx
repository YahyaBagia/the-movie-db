import { ScrollView } from "react-native";

import PostRatingBottomSheet from "./components/PostRatingBottomSheet";

import useMovieDetailsController from "@/src/controllers/main/MovieDetailsController";
import ScreenWrapper from "@/src/components/ScreenWrapper";

import Header from "./components/Header";
import Loading from "./components/Loading";
import Overview from "./components/Overview";
import Cast from "./components/Cast";
import Images from "./components/Images";
import MoviesList from "./components/MoviesList";
import { Stack } from "expo-router";

const MovieDetailsScreen = () => {
  const {
    details,
    images,
    recommendations,
    similarMovies,
    credits,
    accountState,
    openRatingBottomSheet,
    postRatingBottomSheetRef,
    onPressToggleWatchlist,
  } = useMovieDetailsController();
  return (
    <ScreenWrapper>
      {!details ? (
        <Loading />
      ) : (
        <ScrollView>
          {!!details && !!accountState && (
            <Header
              details={details}
              accountState={accountState}
              onPressRate={openRatingBottomSheet}
              onPressToggleWatchlist={onPressToggleWatchlist}
            />
          )}
          <Overview details={details} />
          {!!credits && <Cast cast={credits?.cast} />}
          {!!images && <Images images={images} />}
          {!!recommendations && (
            <MoviesList movies={recommendations} title="Recommendations" />
          )}
          {!!similarMovies && (
            <MoviesList movies={similarMovies} title="Similar Movies" />
          )}
        </ScrollView>
      )}
      <PostRatingBottomSheet ref={postRatingBottomSheetRef} />
      <Stack.Screen options={{ title: details?.title || "Movie Details" }} />
    </ScreenWrapper>
  );
};

export default MovieDetailsScreen;
