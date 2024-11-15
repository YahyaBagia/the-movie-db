import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";

import { MEDIA_IMAGE_BASE_URL } from "@/src/common/Constants";
import SegmentedControl from "@/src/components/SegmentedControl";
import { IImageItem, IMovieImages } from "@/src/apis/movie/interfaces";

export interface IImageProps {
  images: IMovieImages;
}

const Images: React.FC<IImageProps> = ({ images }) => {
  const [selectedImageType, setSelectedImageType] = useState<
    "posters" | "logos" | "backdrops"
  >("posters");

  const imageTypeLabels = {
    posters: "Posters",
    logos: "Logos",
    backdrops: "Backdrops",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge">{imageTypeLabels[selectedImageType]}</Text>
        <View style={styles.spacer} />
        <View style={styles.segmentedControlWrapper}>
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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

const Img: React.FC<IImgProps> = ({ image, imageWidth }) => {
  const { file_path, aspect_ratio } = image;
  const imageHeight = imageWidth / aspect_ratio;

  return (
    <Image
      source={{ uri: `${MEDIA_IMAGE_BASE_URL}/${file_path}` }}
      style={[styles.image, { width: imageWidth, height: imageHeight }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
  },
  spacer: {
    flex: 1,
  },
  segmentedControlWrapper: {
    width: 290,
    alignItems: "flex-end",
  },
  separator: {
    width: 12,
  },
  image: {
    overflow: "hidden",
    marginVertical: 4,
    borderRadius: 8,
  },
});

export default Images;
