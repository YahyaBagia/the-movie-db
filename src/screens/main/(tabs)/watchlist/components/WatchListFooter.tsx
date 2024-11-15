import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export interface IWatchListFooterProps {
  loading: boolean;
  hasMore: boolean;
}

const WatchListFooter: React.FC<IWatchListFooterProps> = (props) => {
  const { hasMore } = props;
  return (
    <View
      style={{ height: 90, justifyContent: "center", alignItems: "center" }}
    >
      {hasMore ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text variant="titleMedium">No more data</Text>
      )}
    </View>
  );
};

export default WatchListFooter;
