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

const Header: React.FC<IHeaderProps> = ({
  details,
  accountState,
  onPressRate,
  onPressToggleWatchlist,
}) => {
  const { poster_path, backdrop_path, vote_average } = details;
  const percentage = vote_average * 10;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: MEDIA_IMAGE_BASE_URL + backdrop_path }}
        style={styles.backgroundImage}
      >
        <Surface style={styles.posterContainer} elevation={5}>
          <Image
            source={{ uri: MEDIA_IMAGE_BASE_URL + poster_path }}
            style={styles.posterImage}
          />
        </Surface>

        <IconButton
          icon={accountState.watchlist ? "bookmark" : "bookmark-outline"}
          onPress={onPressToggleWatchlist}
          style={styles.watchlistButton}
          containerColor={AppThemeColor}
          iconColor="white"
          size={20}
        />

        <View style={styles.ratingContainer}>
          <View style={styles.ratingWrapper}>
            <AnimatedCircularProgress
              size={45}
              width={3}
              fill={percentage}
              tintColor={AppThemeColor}
              backgroundColor="transparent"
              style={styles.circularProgress}
            >
              {(fill) => (
                <Text style={styles.ratingText}>
                  {fill.toFixed(0)}
                  <Text style={styles.percentageText}>%</Text>
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text variant="labelMedium" style={styles.userScoreLabel}>
              User Score
            </Text>
          </View>
          <UserRating accountState={accountState} onPressRate={onPressRate} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: 200,
    justifyContent: "center",
  },
  posterContainer: {
    width: 110,
    height: 165,
    marginLeft: 24,
    borderRadius: 10,
    overflow: "hidden",
  },
  posterImage: {
    flex: 1,
  },
  watchlistButton: {
    position: "absolute",
    top: 4,
    left: 4,
  },
  ratingContainer: {
    position: "absolute",
    bottom: 4,
    right: 4,
  },
  ratingWrapper: {
    alignItems: "center",
  },
  circularProgress: {
    backgroundColor: "black",
    borderRadius: 22.5,
    borderColor: "black",
    borderWidth: 2,
  },
  ratingText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  percentageText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  userScoreLabel: {
    color: "white",
    backgroundColor: AppThemeColor,
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 4,
  },
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
