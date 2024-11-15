import { View, Text } from "react-native";

import useMovieDetailsController from "@/src/controllers/main/MovieDetailsController";

const MovieDetailsScreen = () => {
  const {} = useMovieDetailsController();
  return (
    <View>
      <Text>MovieDetailsScreen</Text>
    </View>
  );
};

export default MovieDetailsScreen;
