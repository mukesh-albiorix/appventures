import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default: localStorage

import apiCallingSlice from "./slices/apiCallingSlice";

// Define the persistConfig
const persistConfig = {
  key: "root",
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, apiCallingSlice);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: {
    apicall: persistedReducer,
  },
});

// Create a persisted store and persistor
const persistor = persistStore(store);

export { store, persistor };
