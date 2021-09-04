import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null,
  },
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
