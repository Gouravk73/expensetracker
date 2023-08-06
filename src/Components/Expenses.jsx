import React, { useContext, useEffect, useRef, useState } from 'react'
import ExpensesContext from '../store/ExpensesContext';

const Expenses = () => {
    const moneyInput=useRef(null);
    const descriptionInput=useRef(null);
    const categoryInput=useRef(null);
    const expenseCtx=useContext(ExpensesContext);
    const [itemsApi,setItemsApi]=useState([]);
    const fetchExpensesData=async()=>{
        await fetch('https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses.json')
        .then((res)=>{
            if(res.ok)return res.json();
            else{
                return res.json().then((data)=>{
                    throw new Error(data.error.message)
                })
            }
        }).then((data)=>{
            if(data){
                //console.log(data)
                const fetchedItems = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                  }));
                  console.log("0",fetchedItems)

                  setItemsApi(fetchedItems)
            }
        })
        .catch((err)=>{console.log(err,'error')})
    }
    useEffect(()=>{
        fetchExpensesData();
    },[])

    const submitHandler=async(e)=>{
        e.preventDefault();
        // const obj={
        //     money:moneyInput.current.value,
        //     description:descriptionInput.current.value,
        //     category:categoryInput.current.value,
        // }
       // expenseCtx.addItems(obj);
        // console.log(obj);
        // console.log(expenseCtx.items)
         fetch('https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses.json',{
            method:"post",
            body:JSON.stringify({
                money:moneyInput.current.value,
                description:descriptionInput.current.value,
                category:categoryInput.current.value
            }),
            headers:{
                'content-type':'application/json'
            }
         }).then((res)=>{
            if(res.ok) return  res.json();
            else{
                return res.json().then((data)=>{
                    throw new Error(data.error.message)
                })
            }})
         .then((data)=>{
             fetchExpensesData();
            //console.log('hello data is here ',data);
         }).catch((err)=>console.log('error',err));
    }



    //console.log('item ',expenseCtx.items);

  return (
    <div>
        <form action="" onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="money">Enter money</label>
                <input type="text" name='money' id='money' ref={moneyInput}/>
            </div>
            <div className="form-group">
                <label htmlFor="description ">Enter description </label>
                <input type="text" name='description ' id='description ' ref={descriptionInput}/>
            </div>
            <div className="form-group">
                <label htmlFor="category">Enter money</label>
                <select className="form-control" id="category" ref={categoryInput}>
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Travel</option>
                    <option>Others</option>
                </select>
            </div>
            <button>submit</button>
        </form>
        {   
             itemsApi.map((item,ind)=><div key={ind}>
                {ind+1} <br />
                     <h5>Money: {item.money}</h5>
                    <h5>Description: {item.description}</h5>
                    <h5>Category: {item.category}</h5>
             </div>)
        }
    </div>
  )
}

export default Expenses