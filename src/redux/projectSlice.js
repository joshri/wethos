import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { projectTestData } from "../utils";

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async () => {}
);

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: projectTestData,
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
