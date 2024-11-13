import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider, MD3DarkTheme as DarkTheme } from "react-native-paper";

import store, { persistor } from "@/src/store";

import AlertView from "@/src/components/GlobalComponents/alert";
import LoaderHud from "@/src/components/GlobalComponents/loaderhud";
import SnackBarView from "@/src/components/GlobalComponents/snackbar";

const _layout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={DarkTheme}>
          <Slot />
          <AlertView />
          <LoaderHud />
          <SnackBarView />
          <StatusBar style="light" />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default _layout;
