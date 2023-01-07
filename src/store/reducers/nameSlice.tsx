import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentName {
  name: string;
}

const initialState: CurrentName = {
  name: "",
};

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = nameSlice.actions;

export const docnameSelector = (state: CurrentName) => {
  state.name;
};

export const nameReducer = nameSlice.reducer;
