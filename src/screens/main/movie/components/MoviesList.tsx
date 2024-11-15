import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";

import { IMediaList } from "@/src/apis/interfaces";
import MediaTile from "@/src/components/MediaTile";
import Spacer from "@/src/components/Spacer";

export interface IMoviesListProps {
  title: string;
  movies: IMediaList;
}

const MoviesList: React.FC<IMoviesListProps> = (props) => {
  const { movies, title } = props;
  const { results } = movies;
  return (
    <View>
      <Text variant="titleLarge" style={{ marginHorizontal: 12 }}>
        {title}
      </Text>
      <FlatList
        renderItem={({ item }) => <MediaTile media={item} />}
        ItemSeparatorComponent={() => <Spacer />}
        data={results}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );
};

export default MoviesList;
