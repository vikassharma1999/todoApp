import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import {signup} from "../../app/helper/index";

class UserSignup extends Component{
    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            password:"",
            error:"",
            success:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(event){
        const {name,value}=event.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const {name,email,password}=this.state;
        signup({name,email,password})
            .then(data=>{
                if(data.error){
                    this.setState({
                        name,
                        email,
                        password,
                        error:data.error,
                        success:false
                    })
                }
                else{
                    this.setState({
                        name:"",
                        email:"",
                        password:"",
                        error:"",
                        success:true
                    })
                }
            })
    }

    render(){
        console.log("Inside Signup Component")
        return (
            <div className="main">
                <h1>Signup</h1>
                {this.state.error && <p>{this.state.error}</p>}
                {this.state.success && <Redirect to="/auth/login"/>}
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <input type="text" id="name" name="name" required={true} placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} / >
                    <input type="email" id="email" name="email" required={true} placeholder="Enter Email" value={this.state.email} onChange={this.handleChange}/>
                    <input type="password" id="password" name="password" required={true} placeholder="Enter password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="signup-btn"><strong>Signup</strong></button>
                    <a className="signup-a" href="/auth/login">Login</a>
                </form>
            </div>
            )
    }
}

export default UserSignup;

