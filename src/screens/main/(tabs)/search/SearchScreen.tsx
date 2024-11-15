import { FlatList, View } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";

import ScreenWrapper from "@/src/components/ScreenWrapper";
import SegmentedControl from "@/src/components/SegmentedControl";

import { useSearchController } from "@/src/controllers/main/SearchController";

import SearchListItem from "./components/SearchListItem";
import SearchListFooter from "./components/SearchListFooter";

const SearchScreen = () => {
  const {
    query,
    setQuery,
    results,
    loading,
    mediaType,
    setMediaType,
    fetchNextPage,
    hasMore,
  } = useSearchController();

  return (
    <ScreenWrapper>
      <Searchbar
        placeholder="Search"
        onChangeText={setQuery}
        value={query}
        autoFocus
        theme={{ roundness: 0 }}
      />
      <View style={{ alignItems: "center", marginVertical: 12 }}>
        <SegmentedControl
          value={mediaType}
          values={[
            { value: "movie", label: "Movies" },
            { value: "tv", label: "TV Shows" },
          ]}
          onValueChange={(value) => setMediaType(value as "movie" | "tv")}
        />
      </View>

      {results.length === 0 && loading && <ActivityIndicator size="large" />}

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SearchListItem media={item} media_type={mediaType} />
          )}
          ListFooterComponent={() => (
            <SearchListFooter loading={loading} hasMore={hasMore} />
          )}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
        />
      )}
    </ScreenWrapper>
  );
};

export default SearchScreen;
