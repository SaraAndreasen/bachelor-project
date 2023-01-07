import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//ANCHOR methods for what is gonna happen in state
interface ReducerState {
    FormData?: object;
}

const initialState: ReducerState = {

}


//ANCHOR what is happening in our state
export const reducerSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<object>) => {
            state.FormData = action.payload;
        }
    }
});

export const {setFormData} = reducerSlice.actions;

export const selectData = (state: ReducerState) => state.FormData;

export const user = reducerSlice.reducer;