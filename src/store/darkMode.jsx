import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode: false,
}
const darkMode=createSlice({
    name:'darkMode',
    initialState,
    reducers:{
        toggleDarkMode(state) {
            state.mode=!state.mode;
        }
    }
})

export const  darkModeActions=darkMode.actions
export default darkMode.reducer;
