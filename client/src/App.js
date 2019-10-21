import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/search.js';

class App extends Component {
  render() {
    return (
      <div>
        <Search history={this.props.history}></Search>
      </div>
    );
  }
}

export default App;