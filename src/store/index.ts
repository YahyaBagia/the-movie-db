import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import StoreStorage from "./StoreStorage";

import sessionReducer from "./slices/sessionSlice";
import uiComponentsReducer from "./slices/uiComponentsSlice";
import userAccountReducer from "./slices/userAccountSlice";

// Configuring redux-persist
const persistConfig = {
  key: "the-movie-db", // Key for root-level persistence
  storage: StoreStorage, // Storage method
  whitelist: ["session", "userAccount"], // Persist only the `session` slice
};

// Combine reducers
const rootReducer = combineReducers({
  session: sessionReducer,
  uiComponents: uiComponentsReducer,
  userAccount: userAccountReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Export persistor for use in the app entry file
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
