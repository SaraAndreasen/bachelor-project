import { combineReducers } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { user } from "./user";

//ANCHOR if multiple states, they can be written in here
export const rootReducer = combineReducers({
    reducer: reducer, user,
})

export const appReducer = (state, action ) => {
    if (action.type === 'USER_LOGOUT'){
        state = undefined;
    }
    return rootReducer(state, action);
}