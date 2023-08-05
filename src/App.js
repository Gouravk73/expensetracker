import Home from './Components/Home'
import Login from './Components/Login';
import Profile from './Components/Profile';
import SingUp from './Components/SingUp';
import ForgetPassword from "./Components/ForgetPassword";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Expenses from './Components/Expenses';
import { ExpensesContextProvider } from './store/ExpensesContext';

function App() {
  return (
    <ExpensesContextProvider>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SingUp/>} />
        <Route path="/forgetPassword" element={<ForgetPassword/>} />
        <Route path="/expenses" element={<Expenses/>} />
        </Routes>
    </BrowserRouter>
    </ExpensesContextProvider>
  );
}

export default App;
