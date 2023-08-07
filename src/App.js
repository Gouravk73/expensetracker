import Home from './Components/Home'
import Login from './Components/Login';
import Profile from './Components/Profile';
import SingUp from './Components/SingUp';
import ForgetPassword from "./Components/ForgetPassword";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
  const isAuth=useSelector(state=>state.auth.isLoggedIn)
  console.log(isAuth)
  return (
     <BrowserRouter>
    <Routes>
        {<Route path='/' element={ isAuth?<Home/>:<Login/>} />}
        {<Route path="/profile" element={isAuth?<Profile/>:<Login/>} />}

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SingUp/>} />
        <Route path="/forgetPassword" element={<ForgetPassword/>} />
          </Routes>
    </BrowserRouter>
   );
}

export default App;
