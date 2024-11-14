import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";

import Utils from "@/src/common/Utils";
import AuthAPIs from "@/src/apis/auth";

import { setSessionId } from "@/src/store/slices/sessionSlice";
import {
  dismissLoaderHud,
  showLoaderHud,
  showSnackBar,
} from "@/src/store/slices/uiComponentsSlice";

const useLoginController = () => {
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    dispatch(showLoaderHud());
    try {
      const requestToken = await getRequestToken();
      const redirectURL = Linking.createURL("/login/verify-web-auth-status");
      const loginUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectURL}`;

      const result = await WebBrowser.openAuthSessionAsync(
        loginUrl,
        Utils.isWeb() ? redirectURL : undefined
      );

      if (result.type === "success") {
        const sessionId = await createSession(requestToken);
        dispatch(setSessionId(sessionId));
        router.replace("/main");
      } else {
        console.log("Login process was cancelled by the user.");
      }
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(
        showSnackBar({ message: `Something went wrong\nError: ${message}` })
      );
      console.log(error);
    } finally {
      dispatch(dismissLoaderHud());
    }
  };

  const getRequestToken = async () => {
    const response = await AuthAPIs.getRequestToken();
    if (response.success) return response.request_token;
    throw new Error("Failed to get request token");
  };

  const createSession = async (requestToken: string) => {
    const response = await AuthAPIs.createSession(requestToken);
    if (response.success && response.session_id) return response.session_id;
    throw new Error("Failed to create session");
  };

  return {
    onPressLogin,
  };
};

export default useLoginController;
