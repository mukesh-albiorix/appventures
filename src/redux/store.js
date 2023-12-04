import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/LoaderSlice";
import apiCallingSlice from "./slices/apiCallingSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    apicall: apiCallingSlice,
  },
});

export default store;
