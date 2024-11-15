import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import SegmentedControl2 from "react-native-segmented-control-2";

export interface ISegmentedControlButton {
  value: string;
  label: string;
}

export interface ISegmentedControlProps {
  value: string;
  values: ISegmentedControlButton[];
  onValueChange: (value: string) => void;
}

const SegmentedControl: React.FC<ISegmentedControlProps> = ({
  value,
  values,
  onValueChange,
}) => {
  const themeColors = useTheme().colors;

  // Memoized values for selected index and tabs
  const selectedIndex = useMemo(
    () => values.findIndex(({ value: v }) => v === value),
    [values, value]
  );

  const tabs = useMemo(() => values.map(({ label }) => label), [values]);

  const onChangeIndex = (index: number) => {
    const selectedValue = values[index]?.value;
    if (selectedValue) {
      onValueChange(selectedValue);
    }
  };

  return (
    <SegmentedControl2
      value={selectedIndex}
      tabs={tabs}
      style={[styles.segmentedControl, { borderColor: themeColors.outline }]}
      selectedTabStyle={[
        styles.selectedTab,
        { backgroundColor: themeColors.surfaceVariant },
      ]}
      textStyle={[styles.text, { color: themeColors.onBackground }]}
      activeTextColor={themeColors.primary}
      onChange={onChangeIndex}
    />
  );
};

const styles = StyleSheet.create({
  segmentedControl: {
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 1,
  },
  selectedTab: {
    borderRadius: 20,
  },
  text: {
    fontWeight: "bold",
  },
});

export default SegmentedControl;
