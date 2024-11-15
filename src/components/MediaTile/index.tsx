import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";
import { ImageBackground } from "expo-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Link } from "expo-router";

import { IMediaItem } from "@/src/apis/interfaces";

import Utils from "@/src/common/Utils";
import { AppThemeColor, MEDIA_IMAGE_BASE_URL } from "@/src/common/Constants";

export interface IMediaTileProps {
  media: IMediaItem;
}

const MediaTile: React.FC<IMediaTileProps> = ({ media }) => {
  const {
    id,
    title,
    original_name,
    poster_path,
    release_date,
    first_air_date,
    media_type,
    vote_average,
  } = media;

  const mediaTitle = useMemo(
    () => (media_type === "movie" ? title : original_name),
    [media_type, title, original_name]
  );

  const mediaReleaseDate = useMemo(
    () => (media_type === "movie" ? release_date : first_air_date),
    [media_type, release_date, first_air_date]
  );

  const percentage = useMemo(() => vote_average * 10, [vote_average]);

  return (
    <Link href={`/main/${media_type}/${id}`}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: poster_path ? MEDIA_IMAGE_BASE_URL + poster_path : undefined,
          }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          {!poster_path && <PlaceholderImage />}
          <CircularProgress percentage={percentage} />
        </ImageBackground>
        <Text style={styles.title} numberOfLines={2}>
          {mediaTitle}
        </Text>
        <Text style={styles.releaseDate}>
          {Utils.formatDate(mediaReleaseDate)}
        </Text>
      </View>
    </Link>
  );
};

const PlaceholderImage: React.FC = () => (
  <Surface style={styles.placeholderImage} elevation={5} mode="flat">
    <Icon source={"image-broken-variant"} size={48} />
  </Surface>
);

const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => (
  <AnimatedCircularProgress
    size={38}
    width={3}
    fill={percentage}
    tintColor={AppThemeColor}
    backgroundColor={"transparent"}
    style={styles.circularProgress}
  >
    {(fill) => (
      <Text style={styles.progressText}>
        {fill.toFixed(0)}
        <Text style={styles.progressTextSmall}>%</Text>
      </Text>
    )}
  </AnimatedCircularProgress>
);

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 290,
  },
  imageBackground: {
    height: 225,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  imageStyle: {
    borderRadius: 12,
  },
  placeholderImage: {
    width: 150,
    height: 225,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 12,
  },
  circularProgress: {
    backgroundColor: "black",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
  },
  progressText: {
    color: "white",
    fontWeight: "bold",
  },
  progressTextSmall: {
    fontSize: 9,
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  releaseDate: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default MediaTile;
