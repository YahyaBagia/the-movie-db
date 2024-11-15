import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import WatchListItem from "./components/WatchListItem";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import WatchListFooter from "./components/WatchListFooter";
import { useWatchlistController } from "@/src/controllers/main/WatchlistController";

const WatchListScreen = () => {
  const { watchlist, loading, hasMore, fetchNextPage } =
    useWatchlistController();

  const { results = [] } = watchlist ?? {};

  return (
    <ScreenWrapper>
      {results.length === 0 && loading && <ActivityIndicator size="large" />}

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <WatchListItem media={item} media_type={"movie"} />
          )}
          ListFooterComponent={() => (
            <WatchListFooter loading={loading} hasMore={hasMore} />
          )}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
        />
      )}
    </ScreenWrapper>
  );
};

export default WatchListScreen;
