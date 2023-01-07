import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDocID {
  id: string;
}

const initialState: CurrentDocID = {
  id: "",
};

export const docIdSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setID } = docIdSlice.actions;

export const docIdSelector = (state: CurrentDocID) => {
  state.id;
};

export const docIdReducer = docIdSlice.reducer;
