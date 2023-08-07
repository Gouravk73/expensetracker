import { createSlice } from "@reduxjs/toolkit";
 
const initialState={
    items: [],
}
const expensesSlice=createSlice({
    name:'expenses',
    initialState:initialState,
    reducers :{
        setExpenses(state,action){
            state.items=action.payload; 
         }
    }
})
export  const expenseActions=expensesSlice.actions;
export default expensesSlice.reducer;