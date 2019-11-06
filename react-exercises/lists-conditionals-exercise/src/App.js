import React, { Component } from 'react';
import ValidationComponent from './ValidationComponent';
import CharComponent from './CharComponent';

import './App.css';

class App extends Component {
  state = {
    content: '',
  }

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  removeChar = (index) => () => {
    const contentCopy = [...this.state.content];

    contentCopy.splice(index, 1);

    this.setState({ content: contentCopy });
  }

  renderCharList = (content = '') => {
    let charList = [];

    charList = (
      <div> {
        content.map((char, index) => {
          return (
            <CharComponent
              handleClick={this.removeChar(index)}
              char={content[index]} />
            );
        })
      }
    </div>);

    return charList;
  }

  render() {
    return (
      <div className="App">
        <input
          name="content"
          onChange={this.changeHandler}
          value={this.state.content} />
        <p>Current content: {this.state.content}</p>
        <ValidationComponent content={this.state.content} />
        { this.renderCharList([...this.state.content]) }
        <ol>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
      </div>
    );
  }
}

export default App;
