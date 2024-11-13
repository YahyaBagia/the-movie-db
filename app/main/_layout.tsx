import { useEffect } from "react";
import { Redirect, Slot } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/src/store";
import AccountAPIs from "@/src/apis/account";
import { setAccountDetails } from "@/src/store/slices/userAccountSlice";

const _layout = () => {
  const dispatch = useDispatch();

  const session_id = useSelector(
    (state: RootState) => state.session.session_id
  );

  useEffect(() => {
    if (session_id) {
      getAccountDetails();
    }
  }, [session_id]);

  const getAccountDetails = async () => {
    const accountDetails = await AccountAPIs.getAccountDetails();
    dispatch(setAccountDetails(accountDetails));
  };

  if (!session_id) {
    return <Redirect href={"/login"} />;
  }

  return <Slot />;
};

export default _layout;
