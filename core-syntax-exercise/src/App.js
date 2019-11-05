import React, { Component } from 'react';
import UserInput from './UserInput';
import UserOutput from './UserOutput';

import './App.css';

class App extends Component {
  state = {
    username: 'Conary'
  }

  usernameHandler = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="App">
        <UserInput
          changeHandler={this.usernameHandler}
          username={this.state.username}
        />
        <UserOutput username={this.state.username}/>
        <UserOutput username="Hernandez"/>
        <ol>
          <li>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
        </ol>
      </div>
    );
  }
}

export default App;
