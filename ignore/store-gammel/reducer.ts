import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//ANCHOR methods for what is gonna happen in state
interface ReducerState {
    Pin?: string;
}

const initialState: ReducerState = {
    Pin : ''
}


//ANCHOR what is happening in our state
export const reducerSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setPin: (state, action: PayloadAction<string>) => {
            state.Pin = action.payload.Pin;
        }
    }
});

export const {setPin} = reducerSlice.actions;

export const selectPin = (state: ReducerState) => state.reducer.Pin;

export const reducer = reducerSlice.reducer;