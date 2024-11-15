import { Image } from "expo-image";
import { FlatList, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import { ICast } from "@/src/apis/movie/interfaces";
import { PROFILE_IMAGE_BASE_URL } from "@/src/common/Constants";

export interface ICastProps {
  cast: ICast[];
}

const Cast: React.FC<ICastProps> = ({ cast }) => (
  <View style={styles.container}>
    <Text variant="titleLarge">Cast</Text>
    <FlatList
      data={cast}
      renderItem={({ item }) => <CastItem cast={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export interface ICastItemProps {
  cast: ICast;
}

const CastItem: React.FC<ICastItemProps> = ({ cast }) => {
  const { name, profile_path, character } = cast;
  return (
    <Card style={styles.card}>
      <Image
        source={{ uri: `${PROFILE_IMAGE_BASE_URL}/${profile_path}` }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text variant="bodyLarge" style={styles.name}>
          {name}
        </Text>
        <Text>{character}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  separator: {
    width: 12,
  },
  card: {
    overflow: "hidden",
    width: 120,
    marginVertical: 4,
  },
  image: {
    width: 120,
    height: 160,
  },
  textContainer: {
    padding: 4,
  },
  name: {
    fontWeight: "bold",
  },
});

export default Cast;
