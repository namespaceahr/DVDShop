import React , { Component } from "react";
import fire from "./config";
import './SignIn.css'

class SignIn extends Component{
constructor(props)
{
    super(props);
    this.signin = this.signin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : ""
    }
}
signin(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        //alert("Signed in successfully");
    }).catch((err)=>{
        alert(err.message);
    })
}
signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        alert("Signed up successfully");
    }).catch((err)=>{
        alert(err.message);
    })
}
onChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}
render()
{
    return(
        <div id="login-form-wrap">
            <h2>DVD Shop</h2>
            <form id="login-form">
                <p>
                    <input type="email" id="email" name="email" placeholder="Email" onChange={this.onChange} value={this.state.email} required /><i className="validation"><span></span><span></span></i>
                </p>
                <p>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password} required /><i className="validation"><span></span><span></span></i>
                </p>
                <p>
                    <input type="submit" id="login" value="Sign In" onClick={this.signin}/>
                </p>
            </form>
            <div id="create-account-wrap">
                <p>New here? 
                    <a href="/#" onClick={this.signup}> Sign Up</a>
                </p>
            </div>
        </div>

    ) //end
}
}
export default SignIn;