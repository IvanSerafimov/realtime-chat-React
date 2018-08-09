import React from 'react';
import history from './history';
import Auth from './Authentication/auth';
import { Redirect, Route, BrowserRouter} from 'react-router-dom';
import App from './App';
import Home from './Home';
import FAQ from './FAQ';
import Chat from './Chat';
import Callback from './Callback';
import Profile from './Profile';

//Initializing the authentication service
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if(/access_token|id_token|error/.test(nextState.location.hash)){
    auth.handleAuthentication();
  }
}

export const makeRoutes = () => {
  return(
    <BrowserRouter history={history} component={App}>
    <div>
      {/* Default route */}
      <Route path="/" render={(props) => <App auth={auth} {...props} />} />
      {/* Home route */}
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
      {/* FAQ route */}
      <Route path="/faq" render={(props)=> <FAQ auth={auth} {...props}/>}/>
      {/* Chat route, redirects to Home if the user isn't authenticated*/}
      <Route path="/chat" render={(props) => (
        !auth.isAuthenticated() ? (
          <Redirect to="/home"/>
        ) : (
          <Chat auth={auth} {...props} />
        )
      )} />
      {/* Profile route, redirects to Home if the user isn't authenticated */}
      <Route path="/profile" render={(props) => (
        !auth.isAuthenticated() ? (
          <Redirect to="/home"/>
        ) : (
          <Profile auth={auth} {...props} />
        )
      )} />
      {/* Callback route, redirects to Home when the user is authenticated */}
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>        
    </div>
  </BrowserRouter>
);
}