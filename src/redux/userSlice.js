import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";

export const login = createAsyncThunk("user/login", async (inputs) => {
  return true;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null,
  },
  reducers: {
    setUserError: (state, action) => void (state.error = action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUserError } = userSlice.actions;

export default userSlice.reducer;
