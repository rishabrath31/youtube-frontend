import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllVideos } from "../../http/http-calls";

export const getAndUpdateVideoData = createAsyncThunk(
  "video/getAndUpdateVideoData",
  async () => {
    try {
      const res = await getAllVideos();
      return res.videos;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  videos: [],
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAndUpdateVideoData.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
  },
});

export const videoReducer = videoSlice.reducer;
