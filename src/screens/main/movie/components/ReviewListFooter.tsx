import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export interface IReviewListFooterProps {
  hasMore: boolean;
}

const ReviewListFooter: React.FC<IReviewListFooterProps> = (props) => {
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

export default ReviewListFooter;
