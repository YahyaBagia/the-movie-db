import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

const VerifyWebAuthStatus = () => {
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession({ skipRedirectCheck: true });
  }, []);
  return <></>;
};
export default VerifyWebAuthStatus;
