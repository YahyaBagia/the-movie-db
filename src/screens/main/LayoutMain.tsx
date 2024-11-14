import { useEffect } from "react";
import { Icon } from "react-native-paper";
import { Redirect, Tabs } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/src/store";
import AccountAPIs from "@/src/apis/account";
import { showSnackBar } from "@/src/store/slices/uiComponentsSlice";
import { setAccountDetails } from "@/src/store/slices/userAccountSlice";

const LayoutMain = () => {
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
    try {
      const accountDetails = await AccountAPIs.getAccountDetails();
      dispatch(setAccountDetails(accountDetails));
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
  };

  if (!session_id) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon size={28} source="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Icon size={28} source="magnify" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist/index"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color }) => (
            <Icon size={28} source="playlist-check" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon size={28} source="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default LayoutMain;
