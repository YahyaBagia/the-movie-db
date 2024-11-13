import { StyleProp, useWindowDimensions, ViewStyle } from "react-native";

const useMaxFullWidth = (maxWidth: number = 400): StyleProp<ViewStyle> => {
  let marginHorizontal = 0;
  const { width } = useWindowDimensions();
  if (width > maxWidth) {
    const extraSpace = width - maxWidth;
    marginHorizontal = extraSpace > 0 ? extraSpace / 2 : 0;
  }
  if (marginHorizontal < 12) marginHorizontal = 12;
  return { marginHorizontal };
};

export default useMaxFullWidth;
