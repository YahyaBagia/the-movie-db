import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export interface ISearchListFooterProps {
  hasMore: boolean;
}

const SearchListFooter: React.FC<ISearchListFooterProps> = ({ hasMore }) => {
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

export default SearchListFooter;
