import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";

import Spacer from "@/src/components/Spacer";
import Utils from "@/src/common/Utils";

const DashboardHeader: React.FC = () => {
  // Memoized background image URI
  const backgroundImageUri = useMemo(
    () =>
      "https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
    []
  );

  return (
    <ImageBackground
      source={{ uri: backgroundImageUri }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text variant="displayLarge" style={styles.text}>
          Welcome.
        </Text>
        <Text variant="displaySmall" style={styles.text}>
          Millions of movies, TV shows, and people to discover. Explore now.
        </Text>

        <Spacer />
        <Link href="/main/search" asChild={Utils.isWeb()}>
          <View
            style={styles.searchContainer}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Search movies and shows"
          >
            <View style={styles.searchInput}>
              <Text style={styles.placeholderText}>Search...</Text>
            </View>
            <LinearGradient
              colors={["rgba(30, 213, 169, 1)", "rgba(1, 180, 228, 1)"]}
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </LinearGradient>
          </View>
        </Link>
        <Spacer />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 300,
  },
  overlay: {
    padding: 12,
    height: "100%",
    backgroundColor: "#00000066",
  },
  text: {
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 2,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
  },
  searchInput: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  placeholderText: {
    color: "#cbcbcb",
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 22,
  },
  searchButtonText: {
    color: "white",
  },
});

export default DashboardHeader;
