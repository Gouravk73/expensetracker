import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import expensesSlice from "./expensesSlice";
const store =configureStore({
    reducer:{
        auth:authReducer,
        expenses:expensesSlice,
    }
})

export default store;