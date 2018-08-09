import { EventEmitter } from 'events';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth-preferences';
import history from '../history';

export default class Auth extends EventEmitter {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: 'https://chatreact.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  userProfile;

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Running the authorization function of auth0.js
  login() {
    this.auth0.authorize();
  }

  // 
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}.`);
      }
    });
  }

  // Create the access and id tokens
  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the expiration time of the access token
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1200 + new Date().getTime()
      );
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // Return to the home page
      history.replace('/home');
    }
  }

  // Check if there is an existing access token
  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token missing');
    }
    return accessToken;
  }

  // Gets the user info from /userinfo and sets it to a variable
  getProfile() {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        localStorage.username = profile.nickname;
      }
    });
  }

  // Remove the 
  logout() {
    // Remove tokens from session storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    // Return to the home page
    history.replace('/home');
  }

  isAuthenticated() {
    // Compare times to check if the user should still be authenticated
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}