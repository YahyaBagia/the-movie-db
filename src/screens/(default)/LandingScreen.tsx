import { useSelector } from "react-redux";
import { Redirect } from "expo-router";

import { RootState } from "@/src/store";

const LandingScreen = () => {
  // Access session_id from the Redux store
  const session_id = useSelector(
    (state: RootState) => state.session.session_id
  );

  if (!!session_id) {
    return <Redirect href={"/main"} />;
  } else {
    return <Redirect href={"/login"} />;
  }
};

export default LandingScreen;
