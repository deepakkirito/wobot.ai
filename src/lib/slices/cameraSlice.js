import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  removedCameras: ["sdsd"],
};

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setRemovedCameras: (state, action) => {
      state.removedCameras = action.payload;
    },
  },
});

export const { setRemovedCameras } = cameraSlice.actions;
export default cameraSlice.reducer;
