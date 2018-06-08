import React, { Component } from 'react';
import './App.css';
import FAQ from './FAQ';
import Chat from './Chat';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
          <div>
            <Route exact path="/" component={FAQ} />
            <Route exact path="/chat" component={Chat} />
          </div>
    );
  }
}

export default App;
