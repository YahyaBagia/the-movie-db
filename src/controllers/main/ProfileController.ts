import { useDispatch, useSelector } from "react-redux";

import {
  dismissLoaderHud,
  showAlert,
  showLoaderHud,
  showSnackBar,
} from "@/src/store/slices/uiComponentsSlice";
import AuthAPIs from "@/src/apis/auth";
import { clearSession } from "@/src/store/slices/sessionSlice";
import { clearAccountDetails } from "@/src/store/slices/userAccountSlice";
import { RootState } from "@/src/store";

const useProfileController = () => {
  const dispatch = useDispatch();

  const account_details = useSelector(
    (state: RootState) => state.userAccount.account_details
  );

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
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(
        showSnackBar({ message: `Something went wrong\nError: ${message}` })
      );
      console.log(error);
    }
    dispatch(clearSession());
    dispatch(clearAccountDetails());
    dispatch(dismissLoaderHud());
  };

  return { account_details, onPressLogout };
};

export default useProfileController;
