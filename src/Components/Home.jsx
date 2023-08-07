import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Context from '../store/Context';
import Expenses from './Expenses';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';

const Home = () => {
  const [profileLink,setProfileLink] =useState(true);
  const mode =useSelector(state=>state.darkMode.mode);
  const dispatch=useDispatch();
  console.log('moafsde',mode) ;
  // const loginCtx=useContext(Context);
  const navigate =useNavigate();
 // const token=loginCtx.token;
  const emailVerification=()=>{
    navigate('/forgetpassword')
  }
  return (
    <div style={{background:mode?'black':'white',color:mode?"white":"black"}}>
      <div className="col d-flex justify-content-between" style={{padding:'5px' }}>
        <p>Welcome to Expense Tracker!!!!</p>
      {profileLink&&(<p>Your Profile is incomplete <Link to={'/profile'}>Complete Now</Link> </p>)}
      </div>
      <hr/>  
      <button className='btn btn-secondary ' onClick={emailVerification}   >Verify email</button>
      <button className='btn btn-secondary ' onClick={()=>dispatch(authActions.logout())}   >logout</button>
      <Expenses/>
      </div>
  )
}

export default Home