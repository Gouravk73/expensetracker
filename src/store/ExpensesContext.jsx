import { createContext, useState } from "react";

const ExpensesContext=createContext({
    items:[],
    addItems:(item)=>{},
})

export const ExpensesContextProvider=(props)=>{
    const [items,setItems]=useState([]);
    const addItemHandler=(item)=>{
        setItems([...items,item]);
    }

    const expensecontext={
        items:items,
        addItems:addItemHandler
    }
    return <ExpensesContext.Provider value={expensecontext} >
        {props.children}
    </ExpensesContext.Provider>
    
}


export default ExpensesContext;