import { createSlice } from "@reduxjs/toolkit";
import data from '../data.json'


export const postStore = createSlice({
    name: 'db',
    initialState: {value: []},
    reducers: {
        add: (state, action)=>{
            state.value = action.payload;
        },
    }
})

export default postStore.reducer
export const {add} = postStore.actions