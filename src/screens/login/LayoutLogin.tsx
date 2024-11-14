import { Redirect, Slot } from "expo-router";
import { useSelector } from "react-redux";

import { RootState } from "@/src/store";

const LayoutLogin = () => {
  const session_id = useSelector(
    (state: RootState) => state.session.session_id
  );

  if (!!session_id) {
    return <Redirect href={"/main"} />;
  }

  return <Slot />;
};

export default LayoutLogin;
