import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expensesSlice';
import darkMode, { darkModeActions } from '../store/darkMode';
import { CSVLink } from "react-csv";

const Expenses = () => {
    const moneyInput=useRef();
    const descriptionInput=useRef();
    const categoryInput=useRef();
    // const [itemsApi,setItemsApi]=useState([]);
    const[editedItemId,setEditedItemId]=useState();
    const[premium,setPremium]=useState(true);
    const items = useSelector(state => state.expenses.items);
    const mode=useSelector(state=>state.darkMode.mode);
    console.log(mode);
    const dispatch=useDispatch();
    const fetchExpensesData=async()=>{
        try{
            const res=await fetch('https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses.json')
            if(!res.ok) {
                const data= await res.json();
                throw new Error(data.error.message);
            }
            const data= await res.json();
            
           if(data===null) dispatch(expenseActions.setExpenses([]))

           else{ 
            const tempItems= Object.keys(data).map((key)=>({
                id:key,
                ...data[key],
            }))
            dispatch(expenseActions.setExpenses(tempItems))
            //setItemsApi(tempItems);
           //console.log(tempItems,'tempItems');
            
        }

        }
        catch(err){console.log(err,'error')}
        
            }
    
    useEffect(()=>{
        fetchExpensesData();
    },[])

    const submitHandler=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch('https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses.json',{
                method:"post",
                body:JSON.stringify({
                    money:moneyInput.current.value,
                    description:descriptionInput.current.value,
                    category:categoryInput.current.value
                }),
                headers:{
                    'content-type':'application/json'
                }
             });
             if(!res.ok){
                const data=await res.json();
                throw new Error(data.error.message);
             }
            fetchExpensesData();

        }
        catch(e){console.log('error',e)}
        moneyInput.current.value='';
        descriptionInput.current.value='';
    }

    const deleteHandler=async(deleteId)=>{
        console.log("delete",deleteId)
        try{
            const res= await fetch(`https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses/${deleteId}.json`,{
            method:"DELETE",})
            if(!res.ok){
                const data=res.json();
                throw new Error(data.Error.message);
            }
             fetchExpensesData();
             console.log(" Expense successfuly deleted ")
         }
        catch(e){console.log("error",e)}
    }
    const saveEditeHandler = async(item)=>{
        const editedItems={
            money:moneyInput.current.value,
            description:descriptionInput.current.value,
            category:categoryInput.current.value
        }
        try{
            const res= await fetch(`https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses/${item.id}.json`,{
                method:'PUT',
                body:JSON.stringify(editedItems),
                headers:{
                    'content-type': 'application/json'
                }
            })
            if(!res.ok) throw new Error('cant edit')
            setEditedItemId(null);
            fetchExpensesData();
        }
        catch(e){console.log("error",e)}

    }
    const editHandler=(item)=>{
       
        setEditedItemId(item.id);
    }
    console.log("",items)
let  total=0;
items.forEach(i => {
    total =total+ Number(i.money);
});
const premiumHandler=()=>{
    setPremium(false);
    dispatch(darkModeActions.toggleDarkMode())
}

    const headers=[
        {label:'money',key:'money'},
        {label:'description',key:'description'},
        {label:'category',key:'category'},
    ]
    const csvLink={
        filename:'file.csv',
        headers:headers,
        data:items
}
   return (
    <div> 
        <form action="" onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="money">Enter money</label>
                <input type="number" name='money' id='money'   ref={moneyInput} />
            </div>
            <div className="form-group">
                <label htmlFor="description ">Enter description </label>
                <input type="text" name='description ' id='description '    ref={descriptionInput}/>
            </div>
            <div className="form-group">
                <label htmlFor="category">Enter money</label>
                <select className="form-control" id="category"    ref={categoryInput}>
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Travel</option>
                    <option>Others</option>
                </select>
            </div>
            <button className='btn btn-primary'>submit</button>
           { total>10000&&premium&&<button className='btn btn-secondary p-3' onClick ={()=>{premiumHandler()}}>activate  Premium  features </button>}
           {!premium&&<button onClick={()=>dispatch(darkModeActions.toggleDarkMode())}>mode</button>}
        </form>
        <CSVLink {...csvLink}  >Download data</CSVLink>
        {     items.map((item,ind)=><div key={ind}>
             {ind + 1} <br />
             {editedItemId===item.id?
                (< >
                    <input type="text" name='money' id='money' defaultValue={item.money}   ref={moneyInput} />
                    <input type="text" name='description ' id='description ' defaultValue={item.description}   ref={descriptionInput}/>
                    <select className="form-control" id="category"    ref={categoryInput}>
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Travel</option>
                    <option>Others</option>
                    </select>
                    <button onClick={()=>saveEditeHandler(item)}>Save</button>
                </>)
                
                :
                (<><h5>Money: {item.money}</h5>
                <h5>Description: {item.description}</h5>
                <h5>Category: {item.category}</h5>
                <button className='btn btn-danger' onClick={() => { deleteHandler(item.id) }}>DELETE</button>
                <button onClick={()=>editHandler(item)} >Edit</button></>)}
                     
            </div>
         )
        }
    </div>
  )
}

export default Expenses