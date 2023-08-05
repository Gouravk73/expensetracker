import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../store/Context';

const Home = () => {
  const loginCtx=useContext(Context);
  console.log("home token",loginCtx.token)
  return (
    <div>
      <div className="col d-flex justify-content-between" style={{padding:'5px'}}>
        <p>Welcome to Expense Tracker!!!!</p>
        <p>Your Profile is incomplete <Link to={'/profile'}>Complete Now</Link> </p>
      </div>
      <hr/>  </div>
  )
}

export default Home