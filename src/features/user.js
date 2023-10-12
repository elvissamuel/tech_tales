import { createSlice } from "@reduxjs/toolkit";


export const userSiice = createSlice({
    name: 'user',
    initialState: {value: ''},
    reducers: {
        currentUser: (state, action)=>{
            state.value = action.payload;
        },
    }
})

export default userSiice.reducer
export const {currentUser} = userSiice.actions