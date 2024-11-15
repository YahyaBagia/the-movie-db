import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const NoDataLoadingIndicator = () => {
  return (
    <View
      style={{ height: 290, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default NoDataLoadingIndicator;
