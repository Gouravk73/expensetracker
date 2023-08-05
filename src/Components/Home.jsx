import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Context from '../store/Context';

const Home = () => {
  const [profileLink,setProfileLink] =useState(true);
  const loginCtx=useContext(Context);
 
   
  return (
    <div>
      <div className="col d-flex justify-content-between" style={{padding:'5px'}}>
        <p>Welcome to Expense Tracker!!!!</p>
      {profileLink&&(<p>Your Profile is incomplete <Link to={'/profile'}>Complete Now</Link> </p>)}
      </div>
      <hr/>  
      <button className='btn btn-secondary ' onClick={()=>{loginCtx.logout()}} >Logout</button></div>
  )
}

export default Home