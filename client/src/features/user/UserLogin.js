import React,{useState} from 'react';
import {Redirect} from "react-router-dom";
import {signin,authenticate,isAuthenticated} from "../../app/helper/index";
import API from "../../app/helper/backend";
const UserLogin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")


    const handleEmailChanged = (event)=>{
        setEmail(event.target.value)
    }

    const handlePasswordChanged = (event)=>{
        setPassword(event.target.value)
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        // console.log(email,password)
        signin({email,password})
            .then(data=>{
                if(data.error){
                    setEmail(email)
                    setPassword(password)
                    setError(data.error)
                }
                else{
                    authenticate(data,()=>{
                        setEmail("")
                        setPassword("")
                        setError("")
                        return window.location.reload(false)
                    })
                }
            })
            .catch(err=>console.log(err))
    }

    return (
            <div className="main">
                    <h1>Login</h1>
                    {isAuthenticated() && <Redirect to="/taskboard"/>}
                    {error.length>0 && <p>{error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="email" id="email" name="email" required={true} placeholder="Enter Email" value={email} onChange={handleEmailChanged}/>
                        <input type="password" id="password" name="password" required={true} placeholder="Enter password" value={password} onChange={handlePasswordChanged}/>
                        <button className="login-btn"><strong>Login</strong></button>
                        <ul className="login-list">
                            <li style={{color: 'aliceblue'}}>Or Login With:</li> 
                            <li><a href={`${API}/auth/google`}><i className="fa fa-google"></i></a></li>
                            <li><a href={`${API}/auth/twitter`}><i className="fa fa-twitter"></i></a></li>
                            <li><a href={`${API}/auth/facebook`} ><i className="fa fa-facebook"></i></a></li>
                        </ul>
                        <a className="login-a" href="/auth/signup">SignUp</a>
                    </form>
            </div>
            )
}


export default UserLogin;

