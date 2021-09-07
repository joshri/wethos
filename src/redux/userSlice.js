import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import Api from "../api/api";
const axios = require("axios");

export const login = createAsyncThunk(
  "user/login",
  async (inputs, { rejectWithValue }) => {
    const config = await Api.getConfig([
      "oauth/token",
      "post",
      {
        client_id: 2,
        client_secret: "GjUJ5tqVliDdTadQDn4eQYQPUtLKjRLICu0qmrTR",
        grant_type: "password",
        password: inputs.password,
        scope: "*",
        username: inputs.email,
      },
    ]);
    try {
      const res = await axios.request(config);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data,
          exp: Date.now() + res.data.expires_in,
        })
      );
      return res.data;
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

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") ? true : false,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null,
  },
  reducers: {
    logout: {
      reducer: (state) => {
        state.user = false;
      },
      prepare: () => {
        localStorage.removeItem("user");
        return { payload: {} };
      },
    },
    setUserError: (state, action) => void (state.error = action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = true;
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

export const { logout, setUserError } = userSlice.actions;

export default userSlice.reducer;
