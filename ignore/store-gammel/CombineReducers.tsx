import { combineReducers } from "@reduxjs/toolkit";

import { setPin } from "../../src/store/reducers/setPin";

const reducer = combineReducers(setPin);

export default reducer;