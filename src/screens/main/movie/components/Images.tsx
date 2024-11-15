import { useState } from "react";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Image } from "expo-image";

import { MEDIA_IMAGE_BASE_URL } from "@/src/common/Constants";
import SegmentedControl from "@/src/components/SegmentedControl";
import { IImageItem, IMovieImages } from "@/src/apis/movie/interfaces";

export interface IImageProps {
  images: IMovieImages;
}

const Images: React.FC<IImageProps> = (props) => {
  const { images } = props;

  const [selectedImageType, setSelectedImageType] = useState<
    "posters" | "logos" | "backdrops"
  >("posters");

  return (
    <View style={{ padding: 12 }}>
      <View style={{ flexDirection: "row" }}>
        <Text variant="titleLarge">
          {selectedImageType === "posters"
            ? "Posters"
            : selectedImageType === "logos"
            ? "Logos"
            : "Backdrops"}
        </Text>
        <View style={{ flex: 1 }} />
        <View style={{ width: 290, alignItems: "flex-end" }}>
          <SegmentedControl
            value={selectedImageType}
            values={[
              { label: "Posters", value: "posters" },
              { label: "Logos", value: "logos" },
              { label: "Backdrops", value: "backdrops" },
            ]}
            onValueChange={(value) => setSelectedImageType(value as any)}
          />
        </View>
      </View>
      <FlatList
        data={images[selectedImageType]}
        renderItem={({ item }) => (
          <Img
            image={item}
            imageWidth={
              selectedImageType === "backdrops"
                ? 200
                : selectedImageType === "logos"
                ? 180
                : 120
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export interface IImgProps {
  image: IImageItem;
  imageWidth: number;
}

const Img: React.FC<IImgProps> = (props) => {
  const { image, imageWidth = 120 } = props;
  const { file_path, aspect_ratio } = image;

  const imageHeight = imageWidth / aspect_ratio;

  return (
    // <Card style={{ overflow: "hidden", marginVertical: 4 }}>
    <Image
      source={{ uri: `${MEDIA_IMAGE_BASE_URL}/${file_path}` }}
      style={{
        width: imageWidth,
        height: imageHeight,
        overflow: "hidden",
        marginVertical: 4,
        borderRadius: 8,
      }}
    />
    // </Card>
  );
};

export default Images;
