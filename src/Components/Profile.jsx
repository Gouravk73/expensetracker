import React, { useContext, useRef } from 'react'
import Context from '../store/Context';

const Profile = () => {
    const nameInput=useRef('');
    const photoInput=useRef('');
     const loginCtx=useContext(Context); 
 
     const submitHandler=(e)=>{
        e.preventDefault();
        const name=nameInput.current.value;
        const photo=photoInput.current.value;
        const token=loginCtx.token
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBjr9ZJeo5m2w0r_5eOv3iWq4I17shym4Y',{
            method:"post",
            body:JSON.stringify({
                idToken:token,
                displayName:name,
                photoUrl:photo,
                returnSecureToken:true,
            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then((res)=>{
            if(res.ok)return res.json();
            else{
                return res.json().then((data)=>{
                    throw new Error(data.error.message)
                })
            }
        }).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
        <div className="container">
            <div className="row">
                <h3>Contact Details</h3>
                <form action="" onSubmit={submitHandler}>
                    <div className="form-group">
                            <label htmlFor="email">Full Name: </label>
                            <input type="text" id='email' className="form-control" placeholder='Joe Doe' required ref={nameInput}/>
                    </div>
                    <div className="form-group">
                            <label htmlFor="email">Profile Photo URL: </label>
                            <input type="text" id='email' className="form-control" placeholder='https://photourl.com' required ref={photoInput}/>
                    </div>
                    <button className='btn btn-danger'>Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Profile