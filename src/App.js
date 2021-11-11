import React, { Component } from 'react';
import './App.css';
import fire from './config';
import { Link } from 'react-router-dom';
import SignIn from './SignIn'
import Dashboard from './Dashboard';
class App extends Component{
  constructor(props)
  {
    super(props);
    this.ref = fire.firestore().collection('list');
    this.unsubscribe = null;
    this.state={
      user : {},
      list : []
    }
  }
  onCollectionUpdate = (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((obj) => {
      const { title, description, price } = obj.data();
      list.push({
        key: obj.id,
        obj, 
        title,
        description,
        price,
      });
    });
    this.setState({
      list
   });
  }


  componentDidMount()
  {
    this.authListener();
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }

  render(){
    if (this.state.user && fire.auth().currentUser) {
        //return (<Dashboard/>);
        return (
        <div>
          <Dashboard/>
          <div>
            <h3 className='header'>
              DVD LIST
            </h3>
          </div>
          <div>
            <h4><Link to="/add">Add New DVD</Link></h4>
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.list.map(dvd =>
                  <tr>
                    <td><Link to={`/details/${dvd.key}`}>{dvd.title}</Link></td>
                    <td>{dvd.description}</td>
                    <td>{dvd.price}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return(
      <SignIn/>
    );
}
}

export default App;