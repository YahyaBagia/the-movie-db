import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAccountDetails } from "@/src/apis/account/interfaces";

// Define the initial state with IAccountDetails or undefined
interface UserAccountState {
  account_details: IAccountDetails | null;
}

const initialState: UserAccountState = {
  account_details: null,
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    setAccountDetails: (state, action: PayloadAction<IAccountDetails>) => {
      state.account_details = action.payload;
    },
    clearAccountDetails: (state) => {
      state.account_details = null;
    },
  },
});

export const { setAccountDetails, clearAccountDetails } =
  userAccountSlice.actions;

export default userAccountSlice.reducer;
