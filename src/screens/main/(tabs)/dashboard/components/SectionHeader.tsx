import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { TimeFrame } from "@/src/apis/interfaces";
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

const SectionHeader: React.FC<ISectionHeaderProps> = ({
  title,
  timeFrame,
  onChangeTimeFrame,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge">{title}</Text>
        <View style={styles.spacer} />
        <View style={styles.segmentControl}>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  header: {
    flexDirection: "row",
  },
  spacer: {
    flex: 1,
  },
  segmentControl: {
    width: 190,
    alignItems: "flex-end",
  },
});

export default SectionHeader;
