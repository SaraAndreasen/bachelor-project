import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDeviceID {
  device_id?: string;
}

const initialState: CurrentDeviceID = {
  device_id: "",
};

export const deviceIDSlice = createSlice({
  name: "deviceID",
  initialState,
  reducers: {
    setDeviceID: (state, action: PayloadAction<string>) => {
      state.device_id = action.payload;
    },
  },
});

export const { setDeviceID } = deviceIDSlice.actions;

export const deviceIDSelector = (state: CurrentDeviceID) => {
  state.device_id;
};

export const deviceIDReducer = deviceIDSlice.reducer;
