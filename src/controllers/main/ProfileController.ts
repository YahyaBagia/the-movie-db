import { useDispatch } from "react-redux";

import {
  dismissLoaderHud,
  showAlert,
  showLoaderHud,
} from "@/src/store/slices/uiComponentsSlice";
import AuthAPIs from "@/src/apis/auth";
import { clearSession } from "@/src/store/slices/sessionSlice";
import { clearAccountDetails } from "@/src/store/slices/userAccountSlice";

const useProfileController = () => {
  const dispatch = useDispatch();

  const onPressLogout = () => {
    dispatch(
      showAlert({
        title: "Logout",
        message: "Are you sure you want to logout?",
        buttons: [{ label: "Yes", onPress: doLogout }, { label: "No" }],
      })
    );
  };

  const doLogout = async () => {
    dispatch(showLoaderHud());
    try {
      await AuthAPIs.deleteSession();
    } catch (e) {
      console.log(e);
    }
    dispatch(clearSession());
    dispatch(clearAccountDetails());
    dispatch(dismissLoaderHud());
  };

  return { onPressLogout };
};

export default useProfileController;
