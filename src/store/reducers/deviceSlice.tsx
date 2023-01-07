import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDevice {
  device_id?: string;
  location?: string;
  model?: string;
  model_num?: string;
  producer?: string;
  software?: string;
  year?: string;
}

const initialState: { selectedDevice: CurrentDevice } = {
  selectedDevice: {
    device_id: "",
    location: "",
    model: "",
    model_num: "",
    producer: "",
    software: "",
    year: "",
  },
};

export const selectedDeviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setSelectedDevice: (state, action: PayloadAction<CurrentDevice>) => {
      state.selectedDevice = action.payload;
      // state.location = action.payload;
      // state.model = action.payload;
      // state.model_num = action.payload;
      // state.producer = action.payload;
      // state.software = action.payload;
      // state.year = action.payload;
    },
  },
});

export const { setSelectedDevice } = selectedDeviceSlice.actions;

export const selectedDeviceSelector = (state: CurrentDevice) => {
  state.device_id,
    state.location,
    state.model,
    state.model_num,
    state.producer,
    state.software,
    state.year;
};

export const selectedDeviceReducer = selectedDeviceSlice.reducer;
