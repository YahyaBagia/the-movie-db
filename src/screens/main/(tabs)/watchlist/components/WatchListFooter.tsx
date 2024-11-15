import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export interface IWatchListFooterProps {
  hasMore: boolean;
}

const WatchListFooter: React.FC<IWatchListFooterProps> = ({ hasMore }) => {
  return (
    <View style={styles.container}>
      {hasMore ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text variant="titleMedium">No more data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WatchListFooter;
