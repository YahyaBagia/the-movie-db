import { View } from "react-native";
import { Text } from "react-native-paper";
import { ImageBackground } from "expo-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { IMediaItem } from "@/src/apis/trending/interfaces";
import { AppThemeColor } from "@/src/common/Constants";
import Utils from "@/src/common/Utils";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export interface IMediaTileProps {
  media: IMediaItem;
}

const MediaTile: React.FC<IMediaTileProps> = (props) => {
  const { media } = props;

  const {
    title,
    original_name,
    poster_path,
    release_date,
    first_air_date,
    media_type,
    vote_average,
  } = media;

  const mediaTitle = media_type === "movie" ? title : original_name;
  const mediaReleaseDate =
    media_type === "movie" ? release_date : first_air_date;

  const pecrcentage = vote_average * 10;

  return (
    <View style={{ width: 150, height: 290 }}>
      <ImageBackground
        source={{ uri: IMAGE_BASE_URL + poster_path }}
        style={{
          height: 225,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
        imageStyle={{ borderRadius: 12 }}
      >
        <AnimatedCircularProgress
          size={38}
          width={3}
          fill={pecrcentage}
          tintColor={AppThemeColor}
          backgroundColor={"transparent"}
          style={{
            backgroundColor: "black",
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 2,
          }}
        >
          {(fill) => (
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {fill.toFixed(0)}
              <Text
                style={{
                  fontSize: 9,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                %
              </Text>
            </Text>
          )}
        </AnimatedCircularProgress>
      </ImageBackground>
      <Text style={{ fontSize: 16, fontWeight: "bold" }} numberOfLines={2}>
        {mediaTitle}
      </Text>
      <Text style={{ fontSize: 12, marginTop: 8 }}>
        {Utils.formatDate(mediaReleaseDate)}
      </Text>
    </View>
  );
};

export default MediaTile;
