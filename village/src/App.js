import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => {});
  }

  smurfsData = data => this.setState({ smurfs: data }); // sets new smurf data to state

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <nav>
          <NavLink exact to="/" style={{ marginRight: "10px" }}>
            Home
          </NavLink>
          <NavLink to="/smurf-form">Smurf</NavLink>
        </nav>
        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} addSmurf={this.addSmurf} />}
        />
        <Route
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
      </div>
    );
  }
}

export default App;
