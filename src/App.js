import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    axios
      //.get("https://api.carlosdev.fr/users") 
      .get("https://jsonplaceholder.typicode.com/users")
      .then(resp => {
        this.setState({
          response: resp.data[0].name
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          DevOps en route !
        </p>
      </header>
    </div>
    );
  }
}

export default App;