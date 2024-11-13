import { ReactNode } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

export interface IScreenWrapperProps {
  children?: ReactNode;
}

const ScreenWrapper: React.FC<IScreenWrapperProps> = ({ children }) => {
  const { background } = useTheme().colors;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
