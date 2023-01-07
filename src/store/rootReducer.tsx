import { combineReducers } from "@reduxjs/toolkit";
import { docIdReducer } from "./reducers/deviceDocIdSlice";
import { deviceIDReducer } from "./reducers/deviceIdSlice";
import { selectedDeviceReducer } from "./reducers/deviceSlice";
import { nameReducer } from "./reducers/nameSlice";
import { pinReducer } from "./reducers/setPin";
import { userDataReducer } from "./reducers/userSlice";
import { store } from "./store";

export const combinedReducer = combineReducers({
  Pin: pinReducer,
  user: userDataReducer,
  device: selectedDeviceReducer,
  deviceID: deviceIDReducer,
  id: docIdReducer,
  name: nameReducer,
});

export const rootReducer = (state, action) => {
  console.log({ state });
  if (action.type === "Pin/pinLogout") {
    state = undefined;
  }
  if (action.type === "user/userLogout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default combinedReducer;
