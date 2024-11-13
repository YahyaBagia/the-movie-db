import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

const index = () => {
  useEffect(() => {
    (async () => {
      const result = await WebBrowser.maybeCompleteAuthSession({
        skipRedirectCheck: true,
      });
      console.log(result);
    })();
  }, []);
  return <></>;
};
export default index;
