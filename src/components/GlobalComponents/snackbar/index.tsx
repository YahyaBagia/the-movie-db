import { useDispatch, useSelector } from "react-redux";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Portal, Snackbar, Text, useTheme } from "react-native-paper";

import { RootState } from "@/src/store";
import {
  dismissSnackBar,
  selectUIComponents,
} from "@/src/store/slices/uiComponentsSlice";

const SnackBarView: React.FC = () => {
  const dispatch = useDispatch();
  const { snackBarData } = useSelector((state: RootState) =>
    selectUIComponents(state)
  );

  const { surfaceVariant: backgroundColor, onSurface: textColor } =
    useTheme().colors;

  const {
    message,
    icon,
    onIconPress,
    button,
    position = "bottom",
  } = snackBarData ?? {};

  const wrapperStyle: StyleProp<ViewStyle> = {
    maxWidth: 400,
    alignSelf: "center",
    top: position === "top" ? 40 : undefined,
  };

  const textStyle: StyleProp<TextStyle> = {
    color: textColor,
    textAlign: button ? "left" : "center",
  };

  return (
    <Portal>
      <Snackbar
        visible={!!snackBarData}
        onDismiss={() => dispatch(dismissSnackBar())}
        action={button}
        icon={icon}
        onIconPress={onIconPress}
        wrapperStyle={wrapperStyle}
        style={{ backgroundColor }}
      >
        <Text variant="titleMedium" style={textStyle}>
          {message}
        </Text>
      </Snackbar>
    </Portal>
  );
};

export default SnackBarView;
