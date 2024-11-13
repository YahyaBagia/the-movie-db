import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import ScreenWrapper from "@/src/components/ScreenWrapper";

import useProfileController from "@/src/controllers/main/ProfileController";

const index = () => {
  const { onPressLogout } = useProfileController();
  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <Text variant="headlineLarge">PROFILE</Text>
      </View>
      <Button onPress={onPressLogout}>Logout</Button>
    </ScreenWrapper>
  );
};

export default index;
