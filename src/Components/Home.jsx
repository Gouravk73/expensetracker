import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Context from '../store/Context';

const Home = () => {
  const [profileLink,setProfileLink] =useState(true);
  const loginCtx=useContext(Context);
  const token=loginCtx.token;
  const emailVerification=()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBjr9ZJeo5m2w0r_5eOv3iWq4I17shym4Y',{
      method:"post",
      body: JSON.stringify({
        requestType:"VERIFY_EMAIL",
        idToken:token
      }),
      headers:{
        'content-type':'application/json'
      }
    }).then((res)=>{
      if(res.ok) return res.json();
      else{
        return res.json().then((data)=>{
          throw new Error(data.Error.message);
        })
      }
    }).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div>
      <div className="col d-flex justify-content-between" style={{padding:'5px'}}>
        <p>Welcome to Expense Tracker!!!!</p>
      {profileLink&&(<p>Your Profile is incomplete <Link to={'/profile'}>Complete Now</Link> </p>)}
      </div>
      <hr/>  
      <button className='btn btn-secondary ' onClick={emailVerification}   >Verify email</button>
      <button className='btn btn-secondary ' onClick={()=>loginCtx.logout()}   >logout</button> 
      </div>
  )
}

export default Home