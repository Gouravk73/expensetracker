import { createContext } from "react";

const Context=createContext({
    token:'',
    login:(token)=>{},
})
export default Context;