import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";

import AuthAPIs from "@/src/apis/auth";
import Utils from "@/src/common/Utils";

import { setSessionId } from "@/src/store/slices/sessionSlice";

const useLoginController = () => {
  const dispatch = useDispatch();

  // const onPressLogin = async () => {
  //   try {
  //     const response = await AuthAPIs.getRequestToken();
  //     const { success, request_token } = response;
  //     if (success) {
  //       const redirectURL = Linking.createURL("/login/check-web-auth");

  //       const TMDB_LOGIN_URL = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${redirectURL}`;

  //       const result = await WebBrowser.openAuthSessionAsync(
  //         TMDB_LOGIN_URL,
  //         Utils.isWeb() ? redirectURL : undefined
  //       );

  //       const { type } = result;
  //       if (type === "success") {
  //         const response = await AuthAPIs.createSession(request_token);
  //         const { success, session_id } = response;
  //         if (success && session_id) {
  //           console.log({ session_id });
  //           dispatch(setSessionId(session_id));
  //           router.replace("/main");
  //         }
  //       } else {
  //         console.log("Login cancelled");
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onPressLogin = async () => {
    try {
      const requestToken = await getRequestToken();
      const redirectURL = Linking.createURL("/login/check-web-auth");
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
      console.error(
        "An error occurred:",
        error instanceof Error ? error.message : error
      );
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
