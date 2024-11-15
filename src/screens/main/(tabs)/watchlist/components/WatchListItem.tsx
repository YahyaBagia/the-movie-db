import { View, StyleSheet } from "react-native";
import { Card, Icon, Surface, Text } from "react-native-paper";
import { Image } from "expo-image";
import { Link } from "expo-router";

import Utils from "@/src/common/Utils";
import { MEDIA_IMAGE_BASE_URL } from "@/src/common/Constants";
import { IMediaItem, MediaType } from "@/src/apis/interfaces";

export interface IWatchListItemProps {
  media: IMediaItem;
  media_type: MediaType;
}

const WatchListItem: React.FC<IWatchListItemProps> = ({
  media,
  media_type,
}) => {
  const {
    id,
    title,
    original_name,
    original_title,
    poster_path,
    release_date,
    first_air_date,
    overview,
  } = media;

  const mediaTitle = media_type === "movie" ? title : original_name;
  const mediaReleaseDate =
    media_type === "movie" ? release_date : first_air_date;

  const originTitle =
    media_type === "movie" && original_title && original_title !== title
      ? original_title
      : "";

  return (
    <Link href={`/main/${media_type}/${id}`} asChild>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          {poster_path ? (
            <Image
              source={{ uri: MEDIA_IMAGE_BASE_URL + poster_path }}
              style={styles.posterImage}
            />
          ) : (
            <Surface style={styles.surface} elevation={5} mode="flat">
              <Icon source="image-broken-variant" size={48} />
            </Surface>
          )}
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text variant="bodyLarge" style={styles.title} numberOfLines={2}>
                {mediaTitle}
                {originTitle && (
                  <Text variant="bodySmall">({originTitle})</Text>
                )}
              </Text>
              <Text>{Utils.formatDate(mediaReleaseDate)}</Text>
            </View>
            <View style={styles.overviewContainer}>
              <Text numberOfLines={4}>{overview}</Text>
            </View>
          </View>
        </View>
      </Card>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    height: 160,
  },
  posterImage: {
    width: 120,
    height: 160,
  },
  surface: {
    width: 120,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 20,
  },
  overviewContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default WatchListItem;
