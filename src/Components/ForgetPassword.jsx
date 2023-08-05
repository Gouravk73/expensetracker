import React, { useContext, useRef } from 'react'
import Context from '../store/Context'

const ForgetPassword = () => {
  const emailInput=useRef(null);
  const loginctx=useContext(Context);
 
  const submitHandler = (e) => {
    const email=emailInput.current.value;
    console.log("email", email);
    e.preventDefault();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBjr9ZJeo5m2w0r_5eOv3iWq4I17shym4Y',{
      method:"post",
      body: JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:email,
      }),
      headers:{
        'content-type':'application/json'
      }
    }).then((res)=>{
      if(res.ok) return res.json();
      else{
        return res.json().then((data)=>{
          console.log("error", data);
          throw new Error(data.Error.message);
        })
      }
    }).then((data)=>{
      console.log('data',data);
    }).catch((err)=>{
      console.log('error', err);
      if (err && err.error && err.error.message) {
          console.log('Error message:', err.error.message);
      } else {
          console.log('Unexpected error:', err);
      }
    })
  }
  return (
    <div className='container-fluid card d-flex justify-content-center align-items-center vh-100'>
      <div className="card  justify-content-center align-items-center">
          <div className="card-body">
          <form action="" onClick={submitHandler}>

            <div className="form-group">
              <div className="form-floating">
                <input type="text" name='email' id='email'  className='form-control' placeholder='abc@gmail.com' ref={emailInput} required/>
                <label htmlFor="email">email</label>
              </div>
            </div>
            <div className='col p-2'>
            <button className='btn btn-danger '>Send link</button>
            </div>
            </form>
          </div>
        
      </div>
    </div>
  )
}

export default ForgetPassword