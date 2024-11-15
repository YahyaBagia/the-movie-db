import { ScrollView } from "react-native";

import useMovieDetailsController from "@/src/controllers/main/MovieDetailsController";
import ScreenWrapper from "@/src/components/ScreenWrapper";

import Header from "./components/Header";
import Loading from "./components/Loading";
import Overview from "./components/Overview";
import Cast from "./components/Cast";
import Images from "./components/Images";
import MoviesList from "./components/MoviesList";

const MovieDetailsScreen = () => {
  const { details, images, recommendations, similarMovies, credits } =
    useMovieDetailsController();
  return (
    <ScreenWrapper>
      {!details ? (
        <Loading />
      ) : (
        <ScrollView>
          <Header details={details} />
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
    </ScreenWrapper>
  );
};

export default MovieDetailsScreen;
