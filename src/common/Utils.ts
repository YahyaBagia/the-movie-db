import { Platform } from "react-native";
import { DateTime } from "luxon";

export default class Utils {
  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //#region - Platform
  static isAndroid = () => Platform.OS === "android";

  static isIOS = () => Platform.OS === "ios";

  static isWeb = () => Platform.OS === "web";
  //#endregion

  //#region - String
  static generateNameInitials = (name: string): string => {
    const initials = name
      .trim()
      .split(" ")
      .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
      .join("");

    return initials;
  };

  static formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    return DateTime.fromISO(dateString).toFormat("MMM d, yyyy");
  };
  //#endregion
}
