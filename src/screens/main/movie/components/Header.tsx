import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import { Image, ImageBackground } from "expo-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { AppThemeColor, MEDIA_IMAGE_BASE_URL } from "@/src/common/Constants";

import { IMovieDetails } from "@/src/apis/movie/interfaces";
import { IAccountState, IMovieRated } from "@/src/apis/rating/interfaces";

export interface IHeaderProps {
  details: IMovieDetails;
  accountState: IAccountState;
  onPressRate: () => void;
  onPressToggleWatchlist: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { details, accountState, onPressRate, onPressToggleWatchlist } = props;
  const { poster_path, backdrop_path, vote_average } = details;

  const pecrcentage = vote_average * 10;

  return (
    <View>
      <ImageBackground
        source={{ uri: MEDIA_IMAGE_BASE_URL + backdrop_path }}
        style={{ height: 200, justifyContent: "center" }}
      >
        <Surface
          style={{
            width: 110,
            height: 165,
            marginLeft: 24,
            borderRadius: 10,
            overflow: "hidden",
          }}
          elevation={5}
        >
          <Image
            source={{ uri: MEDIA_IMAGE_BASE_URL + poster_path }}
            style={{ flex: 1 }}
          />
        </Surface>

        <IconButton
          icon={accountState.watchlist ? "bookmark" : "bookmark-outline"}
          onPress={onPressToggleWatchlist}
          style={{ position: "absolute", top: 4, left: 4 }}
          containerColor={AppThemeColor}
          iconColor="white"
          size={20}
        />

        <View
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AnimatedCircularProgress
              size={45}
              width={3}
              fill={pecrcentage}
              tintColor={AppThemeColor}
              backgroundColor={"transparent"}
              style={{
                backgroundColor: "black",
                borderRadius: 22.5,
                borderColor: "black",
                borderWidth: 2,
              }}
            >
              {(fill) => (
                <Text
                  style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
                >
                  {fill.toFixed(0)}
                  <Text
                    style={{
                      fontSize: 11,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    %
                  </Text>
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text
              variant="labelMedium"
              style={{
                color: "white",
                backgroundColor: AppThemeColor,
                paddingHorizontal: 4,
                borderRadius: 4,
                overflow: "hidden",
                marginTop: 4,
              }}
            >
              User Score
            </Text>
          </View>
          <UserRating accountState={accountState} onPressRate={onPressRate} />
          <View style={{ alignItems: "center" }}></View>
        </View>
      </ImageBackground>
    </View>
  );
};

export interface IUserRatingProps {
  accountState: IAccountState;
  onPressRate: () => void;
}

const UserRating: React.FC<IUserRatingProps> = ({
  accountState,
  onPressRate,
}) => {
  const { rated } = accountState;

  const text = rated
    ? `Your Vibe ${((rated as IMovieRated).value * 10).toFixed(0)}%`
    : "What's your Vibe?";

  return (
    <TouchableOpacity onPress={onPressRate} style={styles.userRatingContainer}>
      <Text style={styles.userRatingText}>{text}</Text>
    </TouchableOpacity>
  );
};

export interface IUserWatchlistStatus {
  accountState: IAccountState;
  onPress: () => void;
}

const UserWatchlistStatus: React.FC<IUserWatchlistStatus> = (props) => {
  const { accountState, onPress } = props;
  const { watchlist } = accountState;
  return (
    <IconButton
      icon={watchlist ? "bookmark" : "bookmark-outline"}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  userRatingContainer: {
    marginTop: 4,
  },
  userRatingText: {
    color: "white",
    backgroundColor: AppThemeColor,
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
});

export default Header;
