import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { getConfig } from "../utils";
const axios = require("axios");

export const login = createAsyncThunk(
  "user/login",
  async (inputs, { rejectWithValue }) => {
    const config = getConfig([
      "token",
      "post",
      {
        client_id: 2,
        client_secret: `${process.env.CLENT_SECRET}`,
        grant_type: "password",
        password: inputs.password,
        scope: "*",
        username: inputs.email,
      },
    ]);
    try {
      const res = await axios.request(config);
      if (res.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...res.data,
            exp: Date.now() + res.data.expires_in,
          })
        );
        return res.data;
      }
    } catch (res) {
      return rejectWithValue(
        res.response
          ? res.response.data.message
            ? res.response.data.message
            : "Unknown Error. Please try again."
          : "Network Error. Please try again."
      );
    }
  }
);

// user: localStorage.getItem("user") ? true : false,

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: true,
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
      .addMatcher(isRejectedWithValue(login), (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUserError } = userSlice.actions;

export default userSlice.reducer;
