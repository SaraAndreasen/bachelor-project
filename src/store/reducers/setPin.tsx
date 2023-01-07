import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentPin {
  Pin?: string | undefined;
}

const initialState: CurrentPin = {
  Pin: "",
};

export const pinSlice = createSlice({
  name: "Pin",
  initialState,
  reducers: {
    setPin: (state, action: PayloadAction<string>) => {
      state.Pin = action.payload;
    },
    pinLogout: () => initialState,
  },
});

export const { setPin, pinLogout } = pinSlice.actions;

export const selectPin = (state: CurrentPin) => state.Pin;

export const pinReducer = pinSlice.reducer;
