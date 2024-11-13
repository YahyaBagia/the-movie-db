import { useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LightTheme,
  MD3Theme,
} from "react-native-paper";
import { createMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from "@react-navigation/native";
import { NavigationTheme } from "react-native-paper/lib/typescript/types";

const useAppController = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const theme = isDarkMode ? DarkTheme : LightTheme;

  const generatedTheme = createMaterial3Theme("#00B3E5");
  const colors = { ...generatedTheme[isDarkMode ? "dark" : "light"] };

  const paperTheme: MD3Theme = { ...theme, colors, dark: isDarkMode };

  const { LightTheme: lightNavTheme, DarkTheme: darkNavTheme } =
    adaptNavigationTheme({
      reactNavigationLight: NavigationDefaultTheme,
      reactNavigationDark: NavigationDarkTheme,
      materialDark: paperTheme,
      materialLight: paperTheme,
    });

  // `fonts` property issue with RNPaper
  const navigationTheme: any = isDarkMode ? darkNavTheme : lightNavTheme;

  return {
    paperTheme,
    navigationTheme,
  };
};

export default useAppController;
