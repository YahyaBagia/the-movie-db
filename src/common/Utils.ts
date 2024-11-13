import { Platform } from "react-native";

export default class Utils {
  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //#region - Platform
  static isAndroid = () => Platform.OS === "android";

  static isIOS = () => Platform.OS === "ios";

  static isWeb = () => Platform.OS === "web";
  //#endregion
}
