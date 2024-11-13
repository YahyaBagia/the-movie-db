import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";

import AuthAPIs from "@/src/apis/auth";
import Utils from "@/src/common/Utils";

const useLoginController = () => {
  const { request_token, approved, denied } = useLocalSearchParams<{
    request_token: string;
    approved: string;
    denied: string;
  }>();

  useEffect(() => {
    if (request_token) {
      console.log("Request token: ", request_token);
    }
    if (approved) {
      console.log("Approved");
    } else if (denied) {
      console.log("Denied");
    }
  }, [request_token, approved, denied]);

  const onPressLogin = async () => {
    try {
      const response = await AuthAPIs.getRequestToken();
      const { success, request_token } = response;
      if (success) {
        const redirectURL = Linking.createURL("/check-web-auth");

        const TMDB_LOGIN_URL = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${redirectURL}`;

        const result = await WebBrowser.openAuthSessionAsync(
          TMDB_LOGIN_URL,
          Utils.isWeb() ? redirectURL : undefined
        );

        const { type } = result;
        if (type === "success") {
          const response = await AuthAPIs.createSession(request_token);
          const { success, session_id } = response;
          if (success) {
            console.log({ session_id });
            // Store session_id safely
          }
        } else {
          console.log("Login cancelled");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    onPressLogin,
  };
};

export default useLoginController;
