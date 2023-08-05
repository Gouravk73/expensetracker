import Home from './Components/Home'
import Login from './Components/Login';
import Profile from './Components/Profile';
import SingUp from './Components/SingUp';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SingUp/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
