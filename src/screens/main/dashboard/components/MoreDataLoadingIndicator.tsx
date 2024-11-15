import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const MoreDataLoadingIndicator = () => {
  return (
    <View
      style={{
        width: 150,
        height: 290,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default MoreDataLoadingIndicator;
