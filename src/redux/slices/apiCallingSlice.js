import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  loading: "idle",
  error: null,
};

export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async (url) => {
    const response = await axios
      .get(`https://dummyjson.com/${url}`)
      .then((res) => res.data);

    return response;
  }
);

const apiCallingSlice = createSlice({
  name: "apiCall",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.pending = "loading";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = "failed";
        state.data = action.error.message;
      });
  },
});

export default apiCallingSlice.reducer;
