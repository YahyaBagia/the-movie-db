import { View } from "react-native";
import { Text } from "react-native-paper";

import { TimeFrame } from "@/src/apis/trending/interfaces";

import SegmentedControl from "@/src/components/SegmentedControl";

export interface ISectionHeaderProps {
  title: string;
  timeFrame: TimeFrame;
  onChangeTimeFrame: (timeFrame: TimeFrame) => void;
}

const TimeFrameSelectionValues = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
];

const SectionHeader: React.FC<ISectionHeaderProps> = (props) => {
  const { title, timeFrame, onChangeTimeFrame } = props;
  return (
    <View style={{ paddingHorizontal: 12, marginVertical: 12 }}>
      <View style={{ flexDirection: "row" }}>
        <Text variant="titleLarge">{title}</Text>
        <View style={{ flex: 1 }} />
        <View style={{ width: 190, alignItems: "flex-end" }}>
          <SegmentedControl
            value={timeFrame}
            values={TimeFrameSelectionValues}
            onValueChange={(value) => onChangeTimeFrame(value as TimeFrame)}
          />
        </View>
      </View>
    </View>
  );
};

export default SectionHeader;
