import React, { Component } from 'react';
import fire from '../config';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard';

class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      price: 0
    };
  }

  componentDidMount() {
    const ref = fire.firestore().collection('list').doc(this.props.match.params.id);
    ref.get().then((dvd) => {
      if (dvd.exists) {
        const list = dvd.data();
        this.setState({
          key: dvd.id,
          title: list.title,
          description: list.description,
          price: list.price
        });
      } else {
        console.log("No such data!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({list:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, price } = this.state;

    const updateRef = fire.firestore().collection('list').doc(this.state.key);
    updateRef.set({
      title,
      description,
      price
    }).then((ref) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        price: 0
      });
      this.props.history.push("/details/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    if (fire.auth().currentUser) {
        return (
          <div>
            <Dashboard/>
            <div class="container">
        <div>
          <div>
            <h3>
              Update DVD Record
            </h3>
          </div>
          <div>
            <h4><Link to={`/details/${this.state.key}`}>Back</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div>
                <label for="title">Title:</label>
                <input type="text" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div>
                <label for="description">Description:</label>
                <input type="text" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div>
                <label for="price">Price:</label>
                <input type="number" name="price" value={this.state.price} onChange={this.onChange} placeholder="Price" />
              </div>
              <button type="submit">Update</button>
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

export default Update;