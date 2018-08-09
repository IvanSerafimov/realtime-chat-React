import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  // Before the component is shown on the page, check if the user is authenticated and get the profile.
  componentWillMount() {
    const { isAuthenticated, getProfile } = this.props.auth;
    if (isAuthenticated()) {
      getProfile();
    }
  }
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Welcome to the Aerofit chat service!</h1>
          {/* If the user isn't logged in, show him a login button, otherwise show him the chat button*/}
          {
            !isAuthenticated() && (
              <div>
                <p>Please sign in to join the chat!</p>
                <p><a className="btn btn-primary btn-lg" onClick={this.login.bind(this)}>Login</a></p>
              </div>
            )
          }
          {
            isAuthenticated() && (
              <div>
                <p>Click the button to join the chat!</p>
                <Link className="btn btn-primary btn-lg" to="chat">Chat</Link>
              </div>
            )
          }
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Home;