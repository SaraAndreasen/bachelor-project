import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  name: string;
  email: string;
  password: string;
  uid: string;
}

const initialState: CurrentUser = {
  name: "",
  email: "",
  password: "",
  uid: "",
};

//payloadaction is what is keyed in the actions and passed around between reducers in the redux applicaiton. It stores the data we want to pass wround.
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.uid = action.payload.uid;
      console.log("Merged user state: ", state);
    },
    userLogout: () => initialState,
  },
});

export const { setUser, userLogout } = userSlice.actions;

export const userSelector = (state: CurrentUser) => {
  state.name, state.email, state.password, state.uid;
};

export const userDataReducer = userSlice.reducer;
