import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { AppThemeColor } from "@/src/common/Constants";

import ScreenWrapper from "@/src/components/ScreenWrapper";
import TypeWriter from "@/src/components/TypeWriter/TypeWriter";

import useLoginController from "@/src/controllers/auth/LoginController";
import Spacer from "@/src/components/Spacer";

const LoginScreen = () => {
  const { onPressLogin } = useLoginController();
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: "center", padding: 12 }}>
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "flex-end" }}
        >
          <TypeWriter
            values={["TMDB", " The Movie DB "]}
            style={{
              color: AppThemeColor,
              fontSize: 40,
              textAlign: "center",
              marginHorizontal: 25,
            }}
          />
        </View>
        <Spacer />
        <View style={{ flex: 1 }}>
          <Button mode="contained" onPress={onPressLogin}>
            Login
          </Button>
          <Spacer />
          <Text style={{ textAlign: "center" }}>
            Upon login, you'll be redirected to TMDB to login
          </Text>
        </View>
        <Text style={{ textAlign: "center" }}>Version 1.0.0</Text>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
