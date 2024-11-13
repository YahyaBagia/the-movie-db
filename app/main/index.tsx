import { Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { router } from "expo-router";

import ScreenWrapper from "@/src/components/ScreenWrapper";
import { clearSession } from "@/src/store/slices/sessionSlice";

const index = () => {
  const dispatch = useDispatch();

  const onPressLogout = () => {
    dispatch(clearSession());
    router.replace("/login");
  };
  return (
    <ScreenWrapper>
      <Text variant="headlineLarge">Home</Text>
      <Button mode="contained" onPress={onPressLogout}>
        Logout
      </Button>
    </ScreenWrapper>
  );
};

export default index;
