import React, { useState } from 'react'
import Context from'./Context'
const LoginContext = (props) => {
    const initialToken=localStorage.getItem("token")
    const[token,setToken]=useState(initialToken);
    const isLoggedIn=!!token
    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem("token",token);
    }
    const logoutHandler=(token)=>{
        setToken(null)
        setTimeout(() => {
            localStorage.setItem("token",null);
        }, 5000);
    }


    const loginContextValue={
        token:token,
        isLoggedIn:isLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
  return (
     <Context.Provider value={loginContextValue}>
        {props.children}
     </Context.Provider>
  )
}

export default LoginContext