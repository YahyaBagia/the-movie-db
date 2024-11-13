import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Utils from "../common/Utils";

const StoreStorage = {
  getItem: (key: string) => {
    if (Utils.isWeb()) return AsyncStorage.getItem(key);
    else return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (Utils.isWeb()) return AsyncStorage.setItem(key, value);
    else return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    if (Utils.isWeb()) return AsyncStorage.removeItem(key);
    else return SecureStore.deleteItemAsync(key);
  },
};

export default StoreStorage;
