import { createContext } from "react";

const Context=createContext({
    token:'',
    login:(token)=>{},
    logout:(token)=>{},
})
export default Context;