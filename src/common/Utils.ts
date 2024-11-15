import { Platform } from "react-native";
import { DateTime } from "luxon";

export default class Utils {
  //#region - Miscellaneous
  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //#endregion

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

  static formatMinutesToHours = (minutes: number): string => {
    if (minutes < 0) throw new Error("Minutes cannot be negative.");

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursPart = hours > 0 ? `${hours}h` : "";
    const minutesPart = remainingMinutes > 0 ? `${remainingMinutes}m` : "";

    // Add a space if both hours and minutes exist
    return [hoursPart, minutesPart].filter(Boolean).join(" ");
  };
}
