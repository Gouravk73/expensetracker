import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import expensesSlice from "./expensesSlice";
import darkMode from "./darkMode";
const store =configureStore({
    reducer:{
        auth:authReducer,
        expenses:expensesSlice,
        darkMode:darkMode
    }
})

export default store;