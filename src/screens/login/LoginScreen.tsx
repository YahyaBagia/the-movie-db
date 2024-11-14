import { Button } from "react-native-paper";

import ScreenWrapper from "@/src/components/ScreenWrapper";

import useLoginController from "@/src/controllers/auth/LoginController";

const LoginScreen = () => {
  const { onPressLogin } = useLoginController();
  return (
    <ScreenWrapper>
      <Button mode="contained" onPress={onPressLogin}>
        Login
      </Button>
    </ScreenWrapper>
  );
};

export default LoginScreen;
