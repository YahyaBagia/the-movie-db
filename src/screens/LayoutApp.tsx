import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import store, { persistor } from "@/src/store";

import AppContainer from "@/src/components/AppContainer";
import AlertView from "@/src/components/GlobalComponents/alert";
import LoaderHud from "@/src/components/GlobalComponents/loaderhud";
import SnackBarView from "@/src/components/GlobalComponents/snackbar";

import useAppController from "@/src/controllers/AppController";

const LayoutApp = () => {
  const { paperTheme, navigationTheme } = useAppController();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
};

export default LayoutApp;
