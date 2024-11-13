import { Slot } from "expo-router";
import {
  PaperProvider,
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
  adaptNavigationTheme,
  MD3Theme,
} from "react-native-paper";

const _layout = () => {
  return (
    <PaperProvider theme={DarkTheme}>
      <Slot />
    </PaperProvider>
  );
};

export default _layout;
