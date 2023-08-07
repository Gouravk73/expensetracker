import { createContext } from "react";


const Context=createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:(token)=>{},
})
export default Context;