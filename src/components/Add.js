import React, { Component } from 'react';
import fire from '../config';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard';
import './Style.css';

class Add extends Component {

  constructor() {
    super();
    this.ref = fire.firestore().collection('list');
    this.state = {
      title: '',
      description: '',
      price: 0
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, price } = this.state;

    this.ref.add({
      title,
      description,
      price
    }).then((dvd) => {
      this.setState({
        title: '',
        description: '',
        price: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error ", error);
    });
  }

  render() {
    const { title, description, price } = this.state;
    if (fire.auth().currentUser) {
    return (
        <div>
        <Dashboard/>
        <div className="container">
            <div>
            <div>
                <h3>
                Add New DVD
                </h3>
            </div>
            <div>
                <h4><Link to="/" >Back to DVD List</Link></h4>
                <form onSubmit={this.onSubmit}>
                <div >
                    <label for="title">Title:</label>
                    <input type="text" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textArea name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
                </div>
                <div>
                    <label for="price">Price:</label>
                    <input type="number" name="price" value={price} onChange={this.onChange} placeholder="price" />
                </div>
                <button type="submit" >Add</button>
                </form>
            </div>
            </div>
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

export default Add;