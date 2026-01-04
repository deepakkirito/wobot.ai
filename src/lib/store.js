import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { cameraApi } from "./api/cameraApi";
import cameraSlice from "./slices/cameraSlice";

const rootReducer = combineReducers({
  camera: cameraSlice,
  [cameraApi.reducerPath]: cameraApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat(cameraApi.middleware),
});

export const persistor = persistStore(store);
