import {
  ActivityIndicator,
  Card,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import { useSelector } from "react-redux";

import { RootState } from "@/src/store";
import { selectUIComponents } from "@/src/store/slices/uiComponentsSlice";

const LoaderHud = () => {
  const { loaderHudVisible } = useSelector((state: RootState) =>
    selectUIComponents(state)
  );

  return (
    <Portal>
      <Modal
        visible={loaderHudVisible}
        dismissable={false}
        dismissableBackButton={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "transparent",
        }}
      >
        <Card>
          <Card.Content style={{ padding: 22, paddingHorizontal: 28 }}>
            <ActivityIndicator size={"large"} />
            <Text variant="titleMedium">Loading...</Text>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default LoaderHud;
