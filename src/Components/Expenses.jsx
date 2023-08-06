import React, {  useEffect, useRef, useState } from 'react'

const Expenses = () => {
    const moneyInput=useRef(null);
    const descriptionInput=useRef(null);
    const categoryInput=useRef(null);
    const [itemsApi,setItemsApi]=useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const fetchExpensesData=async()=>{
        try{
            const res=await fetch('https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses.json')
            if(!res.ok) {
                const data= await res.json();
                throw new Error(data.error.message);
            }
            const data= await res.json();
            
           if(data===null) setItemsApi([])

           else{ 
            const tempItems= Object.keys(data).map((key)=>({
                id:key,
                ...data[key],
            }))
            setItemsApi(tempItems);
           console.log(tempItems,'tempItems');
            
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
             const data=await res.json();
            // console.log("data",data)
            
            fetchExpensesData();

        }
        catch(e){console.log('error',e)}
        moneyInput.current.value = '';
        descriptionInput.current.value = '';
        categoryInput.current.value = '';
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


    const editHandler = (itemId) => {
        setEditItemId(itemId);
    };
const saveEditHandler =async(id)=>{
    try{
        const editItem={
            money:moneyInput.current.value,
            description:descriptionInput.current.value,
            category:categoryInput.current.value
        }
        const res= await fetch(`https://react-expense-c95c4-default-rtdb.firebaseio.com/expenses/${id}.json`,{
            method:"PUT",
            body:JSON.stringify(editItem),
            headers:{
                'content-type':'application/json'
            }
        })
        if(!res.ok) throw new Error("cant edit");
        setEditItemId(null);
        fetchExpensesData();
    }
    catch(e){console.log("error",e)}
}
    //console.log('item ',expenseCtx.items);

  return (
    <div>
        <form action="" onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="money">Enter money</label>
                <input type="text" name='money' id='money'   ref={moneyInput} />
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
            <button>submit</button>
        </form>
        {   
             itemsApi.map((item,ind)=><div key={ind}>
             {ind + 1} <br />
             {editItemId === item.id ? (
                 <>
                     <input type="text" ref={moneyInput}   placeholder='update Money'/>
                     <input type="text" ref={descriptionInput}   placeholder='Update Description'/>
                     <input type="text" ref={categoryInput}  placeholder='Update Category' />
                     <button onClick={() => saveEditHandler(item.id)}>Save</button>
                 </>
             ) : (
                 <>
                     <h5>Money: {item.money}</h5>
                     <h5>Description: {item.description}</h5>
                     <h5>Category: {item.category}</h5>
                     <button className='btn btn-danger' onClick={() => { deleteHandler(item.id) }}>DELETE</button>
                     <button onClick={() => editHandler(item.id)}>Edit</button>
                 </>
             )}
         </div>)
        }
    </div>
  )
}

export default Expenses