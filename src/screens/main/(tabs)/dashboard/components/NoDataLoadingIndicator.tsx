import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const NoDataLoadingIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 290,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoDataLoadingIndicator;
