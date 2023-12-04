import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loaderClice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    isLoaderHandler: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { isLoaderHandler } = loaderClice.actions;
export default loaderClice.reducer;
