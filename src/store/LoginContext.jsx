import React, { useState } from 'react'
import Context from'./Context'
const LoginContext = (props) => {
    const[token,setToken]=useState('');
    const loginHandler=(token)=>{
        setToken(token)
    }


    const loginContextValue={
        token:token,
        login:loginHandler
    }
  return (
     <Context.Provider value={loginContextValue}>
        {props.children}
     </Context.Provider>
  )
}

export default LoginContext