import { Image } from "expo-image";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { ICast } from "@/src/apis/movie/interfaces";
import { PROFILE_IMAGE_BASE_URL } from "@/src/common/Constants";

export interface ICastProps {
  cast: ICast[];
}

const Cast: React.FC<ICastProps> = (props) => {
  const { cast } = props;
  return (
    <View style={{ padding: 12 }}>
      <Text variant="titleLarge">Cast</Text>
      <FlatList
        data={cast}
        renderItem={({ item }) => <CastItem cast={item} />}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export interface ICastItemProps {
  cast: ICast;
}

const CastItem: React.FC<ICastItemProps> = (props) => {
  const { cast } = props;
  const { name, profile_path, character } = cast;
  return (
    <Card style={{ overflow: "hidden", width: 120, marginVertical: 4 }}>
      <Image
        source={{ uri: `${PROFILE_IMAGE_BASE_URL}/${profile_path}` }}
        style={{ width: 120, height: 160 }}
      />
      <View style={{ padding: 4 }}>
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          {name}
        </Text>
        <Text>{character}</Text>
      </View>
    </Card>
  );
};

export default Cast;
