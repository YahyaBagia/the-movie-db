import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "expo-image";

import Spacer from "@/src/components/Spacer";

const DashboardHeader = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      }}
      style={{ height: 300 }}
    >
      <View style={{ padding: 12, height: 300, backgroundColor: "#00000066" }}>
        <Text variant="displayLarge" style={styles.text}>
          Welcome.
        </Text>
        <Text variant="displaySmall" style={styles.text}>
          Millions of movies, TV shows and people to discover. Explore now.
        </Text>

        <Spacer />
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 20,
            height: 40,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: 12 }}
          >
            <Text style={{ color: "#cbcbcb" }}>Search...</Text>
          </View>
          <LinearGradient
            colors={["rgba(30, 213, 169, 1)", "rgba(1, 180, 228, 1)"]}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              paddingHorizontal: 22,
            }}
          >
            <Text style={{ color: "white" }}>Search</Text>
          </LinearGradient>
        </View>
        <Spacer />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 2,
  },
});

export default DashboardHeader;
