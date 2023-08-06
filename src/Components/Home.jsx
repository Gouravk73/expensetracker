import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Context from '../store/Context';
import Expenses from './Expenses';

const Home = () => {
  const [profileLink,setProfileLink] =useState(true);
  const loginCtx=useContext(Context);
  const navigate =useNavigate();
  const token=loginCtx.token;
  const emailVerification=()=>{
    navigate('/forgetpassword')
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
      <Expenses/>
      </div>
  )
}

export default Home