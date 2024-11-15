import { FlatList, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import Spacer from "@/src/components/Spacer";
import MediaTile from "@/src/components/MediaTile";
import { IMediaList } from "@/src/apis/interfaces";

export interface IMoviesListProps {
  title: string;
  movies: IMediaList;
}

const MoviesList: React.FC<IMoviesListProps> = (props) => {
  const { movies, title } = props;
  const { results } = movies;

  return (
    <View>
      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>
      <FlatList
        renderItem={({ item }) => <MediaTile media={item} />}
        ItemSeparatorComponent={() => <Spacer />}
        data={results}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 12,
  },
  flatListContainer: {
    paddingHorizontal: 12,
  },
});

export default MoviesList;
