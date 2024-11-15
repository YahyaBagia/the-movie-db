import { View } from "react-native";
import { Card, Icon, Surface, Text } from "react-native-paper";
import { Image } from "expo-image";

import { IMediaItem, MediaType } from "@/src/apis/interfaces";

import Utils from "@/src/common/Utils";
import { MEDIA_IMAGE_BASE_URL } from "@/src/common/Constants";

export interface ISearchListItemProps {
  media: IMediaItem;
  media_type: MediaType;
}

const SearchListItem: React.FC<ISearchListItemProps> = (props) => {
  const { media, media_type } = props;

  const {
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

  let origin_title = "";
  if (media_type === "movie" && original_title && original_title !== title) {
    origin_title = original_title;
  }

  return (
    <Card style={{ margin: 8, overflow: "hidden" }}>
      <View style={{ flexDirection: "row", height: 160 }}>
        {!!poster_path ? (
          <Image
            source={{ uri: MEDIA_IMAGE_BASE_URL + poster_path }}
            style={{ width: 120, height: 160 }}
          />
        ) : (
          <Surface
            style={{
              width: 120,
              height: 160,
              justifyContent: "center",
              alignItems: "center",
            }}
            elevation={5}
            mode="flat"
          >
            <Icon source={"image-broken-variant"} size={48} />
          </Surface>
        )}
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: "bold", lineHeight: 20 }}
              numberOfLines={2}
            >
              {mediaTitle}
              {origin_title.length > 0 && (
                <Text variant="bodySmall">({origin_title})</Text>
              )}
            </Text>
            <Text>{Utils.formatDate(mediaReleaseDate)}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text numberOfLines={4}>{overview}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default SearchListItem;
