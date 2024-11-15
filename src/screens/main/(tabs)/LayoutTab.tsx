import { useEffect } from "react";
import { Icon } from "react-native-paper";
import { Redirect, Stack, Tabs } from "expo-router";
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
      fetchAccountDetails();
    }
  }, [session_id]);

  const fetchAccountDetails = async () => {
    try {
      const accountDetails = await AccountAPIs.getAccountDetails();
      dispatch(setAccountDetails(accountDetails));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch(
        showSnackBar({ message: `Something went wrong\nError: ${message}` })
      );
      console.error(error);
    }
  };

  if (!session_id) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Tabs screenOptions={{ tabBarLabelPosition: "below-icon" }}>
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
      <Stack.Screen options={{ headerShown: false }} />
    </>
  );
};

export default LayoutMain;
