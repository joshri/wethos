import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import Api from "../api/api";
const axios = require("axios");

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (arg, { rejectWithValue }) => {
    const config = await Api.getConfig(["api/v2/projects", "get", null]);
    try {
      const res = await axios.request(config);
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

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: null,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null,
  },
  reducers: {
    setProjectError: (state, action) => void (state.error = action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.project = action.payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addMatcher(isRejectedWithValue(getProjects), (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setProjectError } = projectSlice.actions;

export default projectSlice.reducer;
