import React , { Component } from "react";
import fire from "./config";
import SignIn from './SignIn';
import './Dashboard.css'
import logo from './assets/logo.png'

class Dashboard extends Component{
constructor(props)
{
    super(props)
    this.state={
        
    }
}
signout(){
    fire.auth().signOut();
}
render()
{
    var user = fire.auth().currentUser;
    if (user) {
        return(
            <div>
                <div className="container">
                    <div className="logo">
                        <img src={logo} alt="logo" width="130"/>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a href="/#" onClick={this.signout}> Sign Out</a>
                            </li>
                        </ul>
                    </nav>
                    
                </div>
                <hr/>
            </div>
        )
    }
    return(
        <SignIn/>
    );
    
}

}
export default Dashboard;