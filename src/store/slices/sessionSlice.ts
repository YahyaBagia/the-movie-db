import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  session_id: string | null;
}

const initialState: SessionState = {
  session_id: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.session_id = action.payload;
    },
    clearSession: (state) => {
      state.session_id = null;
    },
  },
});

export const { setSessionId, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
