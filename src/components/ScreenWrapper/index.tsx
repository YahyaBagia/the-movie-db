import { ReactNode } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

export interface IScreenWrapperProps {
  children: ReactNode;
}

const ScreenWrapper: React.FC<IScreenWrapperProps> = ({ children }) => {
  const { background } = useTheme().colors;
  return (
    <View style={{ flex: 1, backgroundColor: background }}>{children}</View>
  );
};

export default ScreenWrapper;
