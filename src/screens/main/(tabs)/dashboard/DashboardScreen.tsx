import { FlatList, ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";

import Spacer from "@/src/components/Spacer";
import MediaTile from "@/src/components/MediaTile";
import ScreenWrapper from "@/src/components/ScreenWrapper";

import SectionHeader from "./components/SectionHeader";
import DashboardHeader from "./components/DashboardHeader";
import NoDataLoadingIndicator from "./components/NoDataLoadingIndicator";
import MoreDataLoadingIndicator from "./components/MoreDataLoadingIndicator";

import useDashboardController from "@/src/controllers/main/DashboardController";

const DashboardScreen = () => {
  const {
    isLoadingMovie,
    isLoadingTv,
    loadMoreMovie,
    loadMoreTv,
    trendingMovie,
    trendingTv,
    selectedTimeFrameMovie,
    selectedTimeFrameTV,
    setSelectedTimeFrameMovie,
    setSelectedTimeFrameTV,
  } = useDashboardController();
  return (
    <ScreenWrapper>
      <ScrollView>
        <DashboardHeader />
        <Spacer />
        <View>
          <SectionHeader
            title="Movies"
            onChangeTimeFrame={setSelectedTimeFrameMovie}
            timeFrame={selectedTimeFrameMovie}
          />
          {trendingMovie.length === 0 && isLoadingMovie && (
            <NoDataLoadingIndicator />
          )}
          {trendingMovie.length > 0 && (
            <FlatList
              renderItem={({ item }) => <MediaTile media={item} />}
              ItemSeparatorComponent={() => <Spacer />}
              ListFooterComponent={() =>
                isLoadingMovie ? <MoreDataLoadingIndicator /> : null
              }
              data={trendingMovie}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              onEndReached={loadMoreMovie}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
        <Spacer />
        <Divider />
        <View>
          <SectionHeader
            title="TV Shows"
            onChangeTimeFrame={setSelectedTimeFrameTV}
            timeFrame={selectedTimeFrameTV}
          />
          <FlatList
            renderItem={({ item }) => <MediaTile media={item} />}
            ItemSeparatorComponent={() => <Spacer />}
            ListFooterComponent={() =>
              isLoadingTv ? <MoreDataLoadingIndicator /> : null
            }
            data={trendingTv}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            onEndReached={loadMoreTv}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default DashboardScreen;
