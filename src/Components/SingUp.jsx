import React, { useRef, useState } from 'react'

const SingUp = () => {
    const emailInput=useRef(null);
    const passwordInput=useRef(null);
    const confirmPasswordInput=useRef(null);    
    const [passwordError, setPasswordError] = useState(false);

    const submitHandler=(e)=>{
        e.preventDefault();
        const password = passwordInput.current.value;
        const confirmPassword = confirmPasswordInput.current.value;
        const email=emailInput.current.value;
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjr9ZJeo5m2w0r_5eOv3iWq4I17shym4Y',{
            method:"post",
            body:JSON.stringify({
                email:email,
                password:password,
                confirmPassword:confirmPassword,
            }),
            headers:{
                "Content-Type": "application/json",
            }
        }).then((res)=>{
            if(res.ok) return  res.json();
            else {
                return res.json().then((data)=>{
                    throw new Error(data.error.message)

                })
            }
        }).then((data)=>{
            console.log('success')
        }).catch((err)=>{
            setPasswordError(true);
             alert(err)
            return;
        })


        setPasswordError(false);
        emailInput.current.value=''
        passwordInput.current.value=''
        confirmPasswordInput.current.value=''
    }

  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center vh-100'  >
        <div className="card" style={{width:' 400px'}}>
            <div className="card-body">
                <h3 className="card-title text-center">Sign Up</h3>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <div className='form-floating mb-3'>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" required ref={emailInput}/>
                            <label htmlFor="email">Email address</label>
                            </div>
                    </div>
                    <div className="form-group">
                        <div className='form-floating mb-3'>
                            <input type="password" className="form-control" id="password" placeholder='abc@123' required ref={passwordInput}/>
                            <label htmlFor="password">Password</label>


                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-floating">
                            <input type="confirm-password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} id="confirm-password" placeholder='abc@123' required ref={confirmPasswordInput}/>
                            <label htmlFor="confirm-password">confirm password</label>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-block" type="submit"  style={{ margin:'10px 0', padding:'5px 70px'}}>Sign Up</button>
                </form>

            </div>

        </div>
        <div className='  text-center' style={{border:'1px solid black', padding:'10px 25px', margin: '10px'}} >Have an account? Login</div>

     </div>
  )
}

export default SingUp