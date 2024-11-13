// src/store/uiComponentsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { RootState } from "../index";

// Define interfaces for UI components
interface ISnackBarValues {
  message: string;
  icon?: IconSource;
  onIconPress?: () => void;
  button?: { label: string; onPress?: () => void };
  position?: "top" | "bottom";
}

interface IAlertDialogIconConfig {
  icon: IconSource;
  color?: string;
  size?: number;
}

interface IAlertDialogValues {
  title?: string;
  message?: string;
  iconConfig?: IAlertDialogIconConfig;
  buttons?: { label: string; onPress?: () => void }[];
  dismissable?: boolean;
}

interface UIComponentsState {
  snackBarData?: ISnackBarValues;
  alertDialogData?: IAlertDialogValues;
  loaderHudVisible: boolean;
}

// Initial state
const initialState: UIComponentsState = {
  snackBarData: undefined,
  alertDialogData: undefined,
  loaderHudVisible: false,
};

const uiComponentsSlice = createSlice({
  name: "uiComponents",
  initialState,
  reducers: {
    // Snack Bar Actions
    showSnackBar: (state, action: PayloadAction<ISnackBarValues>) => {
      state.snackBarData = action.payload;
    },
    dismissSnackBar: (state) => {
      state.snackBarData = undefined;
    },

    // Alert Dialog Actions
    showAlert: (state, action: PayloadAction<IAlertDialogValues>) => {
      state.alertDialogData = action.payload;
    },
    dismissAlert: (state) => {
      state.alertDialogData = undefined;
    },

    // Loader HUD Actions
    showLoaderHud: (state) => {
      state.loaderHudVisible = true;
    },
    dismissLoaderHud: (state) => {
      state.loaderHudVisible = false;
    },
  },
});

export const {
  showSnackBar,
  dismissSnackBar,
  showAlert,
  dismissAlert,
  showLoaderHud,
  dismissLoaderHud,
} = uiComponentsSlice.actions;

export default uiComponentsSlice.reducer;

// Selector for accessing the UI components state
export const selectUIComponents = (state: RootState) => state.uiComponents;
