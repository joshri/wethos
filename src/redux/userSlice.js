import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { getConfig } from "../utils";
const axios = require("axios");

export const login = createAsyncThunk("user/login", async (inputs) => {
  const config = getConfig([
    "token",
    "post",
    {
      client_id: 2,
      client_secret: `${process.env.CLIENT_SECRET}`,
      grant_type: "password",
      password: inputs.password,
      scope: "*",
      username: inputs.email,
    },
  ]);
  const res = await axios.request(config);
  if (res.statusText === "OK")
    localStorage.setItem(
      "user",
      JSON.stringify({ ...res.data, exp: Date.now() + res.data.expires_in })
    );
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") ? true : false,
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
