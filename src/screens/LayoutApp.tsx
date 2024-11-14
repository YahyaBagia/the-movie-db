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
import AppContainer from "../components/AppContainer";

const LayoutApp = () => {
  const { paperTheme, navigationTheme } = useAppController();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={navigationTheme}>
          <PaperProvider theme={paperTheme}>
            <AppContainer>
              <Slot />
              <AlertView />
              <LoaderHud />
              <SnackBarView />
              <StatusBar style="light" />
            </AppContainer>
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default LayoutApp;
