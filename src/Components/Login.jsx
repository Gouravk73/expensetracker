import React, {  useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//import Context from '../store/Context';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
const Login = () => {
    const emailInput=useRef(null);
    const passwordInput=useRef(null);
    const navigate=useNavigate();
    //const auth=useSelector(state=>state.auth.isLoggedIn)
    const dispatch=useDispatch();
    //const loginCtx=useContext(Context);
    const forgetPassword=()=>{
        navigate('/forgetPassword')
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email=emailInput.current.value;
        const password=passwordInput.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjr9ZJeo5m2w0r_5eOv3iWq4I17shym4Y',{
            method: "POST",
            body: JSON.stringify({
                email:email,
                password:password
            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then((res)=>{
            if(res.ok) return  res.json();
            else{
                return res.json().then((data)=>{
                    throw new Error(data.error.message)

                })
            }
        }).then((data)=>{
             dispatch(authActions.login(data.idToken))
             navigate('/')
        }).catch((err)=>{
            alert(err);
        })
     };
    const handleSignUpClick=()=>{
        navigate('/signup')
    }

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center vh-100'>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">Login</h3>
                    <form action="" onSubmit={handleLogin}>
                        <div className="form-group">
                            <div className="form-floating">
                                <input type="email" id='email' className="form-control" placeholder='abc@gmail.com' ref={emailInput} required/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-floating">
                                <input type="password" id='password' className="form-control" placeholder='abc@123' ref={passwordInput} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className='col d-flex flex-column justify-content-center align-items-center p-4'>
                        <Button onClick={forgetPassword}>Forget Password?</Button>

                        </div>
                        <button className='btn btn-primary' style={{ margin:'10px 0', padding:'5px 70px'}}>Login</button>
                    </form>
                </div>
            </div>
            <button className="btn btn-outline-primary " onClick={handleSignUpClick} style={{ padding: '10px', margin: '10px', border: '1px solid black' ,color:'black'}}>
                    New User? Sign up
            </button>

        </div>
    );
};

export default Login;
