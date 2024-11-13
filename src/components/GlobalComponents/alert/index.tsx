import { useSelector } from "react-redux";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import useMaxFullWidth from "@/src/hooks/useMaxFullWidth";

import { RootState } from "@/src/store";
import {
  dismissAlert,
  selectUIComponents,
} from "@/src/store/slices/uiComponentsSlice";

const AlertView: React.FC = () => {
  const { alertDialogData } = useSelector((state: RootState) =>
    selectUIComponents(state)
  );

  const { title, message, iconConfig, dismissable, buttons } =
    alertDialogData ?? {};

  const { icon, color, size } = iconConfig ?? {};

  const maxFullWidthStyle = useMaxFullWidth();

  return (
    <Portal>
      <Dialog
        visible={!!alertDialogData}
        onDismiss={dismissAlert}
        dismissable={dismissable}
        style={maxFullWidthStyle}
      >
        {!!iconConfig && <Dialog.Icon icon={icon!} color={color} size={size} />}
        {!!title && (
          <Dialog.Title style={!!icon ? { textAlign: "center" } : undefined}>
            {title}
          </Dialog.Title>
        )}
        {!!message && (
          <Dialog.Content>
            <Text
              variant="bodyLarge"
              style={!!icon ? { textAlign: "center" } : undefined}
            >
              {message}
            </Text>
          </Dialog.Content>
        )}
        {!!buttons && buttons.length > 0 && (
          <Dialog.Actions>
            {buttons.map(({ label, onPress }) => (
              <Button
                onPress={() => {
                  onPress && onPress();
                  dismissAlert();
                }}
                key={label}
              >
                {label}
              </Button>
            ))}
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
};

export default AlertView;
