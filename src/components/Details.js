import React, { Component } from 'react';
import fire from '../config';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = fire.firestore().collection('list').doc(this.props.match.params.id);
    ref.get().then((dvd) => {
      if (dvd.exists) {
        this.setState({
          list: dvd.data(),
          key: dvd.id,
          isLoading: false
        });
      } else {
        console.log("No such data!");
      }
    });
  }

  delete(id){
    fire.firestore().collection('list').doc(id).delete().then(() => {
      console.log("dvd successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing dvd: ", error);
    });
  }

  render() {
    if (fire.auth().currentUser) {
        return (
          <div>
            <Dashboard/>
          <div class="container_poster">
            <div class="poster">
                <div class="poster__img"></div>
                <div class="poster__info">
                <h1 class="poster__title">{this.state.list.title}</h1>
                <p class="poster__text">Description : {this.state.list.description}</p><br/>
                <p class="poster__text">Price : {this.state.list.price}</p>
                </div>
            </div>
            <Link to="/">Back To List</Link><br/>
            <Link to={`/update/${this.state.key}`} >Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)}>Delete</button>
            </div>
          </div> 
        );
        }
        return(
            <div>
            <h1>Access Prohibited</h1>
            <Link to="/">Click to login</Link>
            </div>
        );


  }
}

export default Details;