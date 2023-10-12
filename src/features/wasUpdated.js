import { createSlice } from "@reduxjs/toolkit";


export const wasUpdatedSlice = createSlice({
    name: 'wasUpdated',
    initialState: {value: false},
    reducers: {
        setWasUpdated: (state, action)=>{
            state.value = action.payload;
        },
    }
})

export default wasUpdatedSlice.reducer
export const {setWasUpdated} = wasUpdatedSlice.actions