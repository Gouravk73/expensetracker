import Home from './Components/Home'
import Login from './Components/Login';
import Profile from './Components/Profile';
import SingUp from './Components/SingUp';
import ForgetPassword from "./Components/ForgetPassword";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Expenses from './Components/Expenses';
import { ExpensesContextProvider } from './store/ExpensesContext';
import { useContext } from 'react';
import Context from './store/Context';
 
function App() {
  const context= useContext(Context);
 
  return (
    <ExpensesContextProvider>
    <BrowserRouter>
    <Routes>
        {<Route path='/' element={context.isLoggedIn?<Home/>:<Login/>} />}
        {<Route path="/profile" element={context.isLoggedIn?<Profile/>:<Login/>} />}

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SingUp/>} />
        <Route path="/forgetPassword" element={<ForgetPassword/>} />
          </Routes>
    </BrowserRouter>
    </ExpensesContextProvider>
  );
}

export default App;
