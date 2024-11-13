import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAccountDetails } from "@/src/apis/account/interfaces";

// Define the initial state with IAccountDetails or undefined
interface UserAccountState {
  accountDetails?: IAccountDetails;
}

const initialState: UserAccountState = {
  accountDetails: undefined,
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    setAccountDetails: (state, action: PayloadAction<IAccountDetails>) => {
      state.accountDetails = action.payload;
    },
    clearAccountDetails: (state) => {
      state.accountDetails = undefined;
    },
  },
});

export const { setAccountDetails, clearAccountDetails } =
  userAccountSlice.actions;

export default userAccountSlice.reducer;
