import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@react-navigation/native";

import store, { persistor } from "@/src/store";

import AlertView from "@/src/components/GlobalComponents/alert";
import LoaderHud from "@/src/components/GlobalComponents/loaderhud";
import SnackBarView from "@/src/components/GlobalComponents/snackbar";

import useAppController from "@/src/controllers/AppController";

const _layout = () => {
  const { paperTheme, navigationTheme } = useAppController();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={navigationTheme}>
          <PaperProvider theme={paperTheme}>
            <Slot />
            <AlertView />
            <LoaderHud />
            <SnackBarView />
            <StatusBar style="light" />
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default _layout;
