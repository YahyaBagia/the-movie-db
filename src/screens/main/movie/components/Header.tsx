import { View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { Image, ImageBackground } from "expo-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { AppThemeColor, MEDIA_IMAGE_BASE_URL } from "@/src/common/Constants";

import { IMovieDetails } from "@/src/apis/movie/interfaces";
import { IAccountState, IMovieRated } from "@/src/apis/rating/interfaces";

export interface IHeaderProps {
  details: IMovieDetails;
  accountState: IAccountState;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { details, accountState } = props;
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
          <UserRated accountState={accountState} />
          <View style={{ alignItems: "center" }}></View>
        </View>
      </ImageBackground>
    </View>
  );
};

export interface IUserRatedProps {
  accountState: IAccountState;
}

const UserRated: React.FC<IUserRatedProps> = (props) => {
  const { accountState } = props;
  const { rated } = accountState;

  if (!rated) return null;

  const { value } = rated as IMovieRated;

  return (
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
      Your Vibe {value * 10}%
    </Text>
  );
};

export default Header;
