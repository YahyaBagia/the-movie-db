import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const MoreDataLoadingIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 290,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoreDataLoadingIndicator;
