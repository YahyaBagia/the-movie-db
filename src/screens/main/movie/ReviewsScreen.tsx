import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ReviewListItem from "./components/ReviewListItem";
import ReviewListFooter from "./components/ReviewListFooter";

import ScreenWrapper from "@/src/components/ScreenWrapper";

import useReviewsController from "@/src/controllers/main/ReviewsController";
import { Stack } from "expo-router";

const ReviewsScreen = () => {
  const { reviews, loading, hasMore, fetchNextPage } = useReviewsController();

  const { results = [] } = reviews ?? {};

  return (
    <ScreenWrapper>
      {results.length === 0 && loading && <ActivityIndicator size="large" />}

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReviewListItem review={item} />}
          ListFooterComponent={() => <ReviewListFooter hasMore={hasMore} />}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
        />
      )}
      <Stack.Screen options={{ title: "Reviews" }} />
    </ScreenWrapper>
  );
};

export default ReviewsScreen;
