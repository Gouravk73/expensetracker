import React, { useContext, useRef } from 'react'
import ExpensesContext from '../store/ExpensesContext';

const Expenses = () => {
    const moneyInput=useRef(null);
    const descriptionInput=useRef(null);
    const categoryInput=useRef(null);
    const expenseCtx=useContext(ExpensesContext);

    const submitHandler=(e)=>{
        e.preventDefault(); 
        const obj={
            money:moneyInput.current.value,
            description:descriptionInput.current.value,
            category:categoryInput.current.value,
        }
        expenseCtx.addItems(obj);
        console.log(obj);
        console.log(expenseCtx.items)
         
    }
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
            expenseCtx.items.map((item,ind)=><div key={ind}>
                {ind+1} <br /> <h5>{item.money}</h5>
                            <h5>{item.description}</h5>
                            <h5>{item.category}</h5>
            </div>)
        }
    </div>
  )
}

export default Expenses