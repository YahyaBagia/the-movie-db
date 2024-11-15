import { Text, useTheme } from "react-native-paper";
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

const SegmentedControl: React.FC<ISegmentedControlProps> = (props) => {
  const { value, values, onValueChange } = props;

  const onChangeIndex = (index: number) => {
    const value = values[index].value;
    onValueChange(value);
  };

  const selectedIndex = values.findIndex(({ value: v }) => v === value);

  const {
    primary: primaryColor,
    surfaceVariant: backgroundColor,
    onBackground: textColor,
    outline: borderColor,
  } = useTheme().colors;

  return (
    <SegmentedControl2
      value={selectedIndex}
      tabs={values.map(({ label }) => label)}
      style={{
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: borderColor,
      }}
      selectedTabStyle={{ borderRadius: 20, backgroundColor }}
      textStyle={{ color: textColor, fontWeight: "bold" }}
      activeTextColor={primaryColor}
      onChange={onChangeIndex}
    />
  );
};

export default SegmentedControl;
