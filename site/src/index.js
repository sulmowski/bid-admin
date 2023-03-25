import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import config from './config';
import App from './App';
import InternalUtils from './libs/internalLib'
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import 'typeface-roboto';

const elLib = new InternalUtils();
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    oauth: {
      domain: elLib.getAuthDomain(),
      scope: ['email', 'openid'],
      redirectSignIn: config.constants.BASE_URL + "/sso-login/",
      redirectSignOut: config.constants.BASE_URL + "/logout/",
      responseType: 'code',
      options: {
        AdvancedSecurityDataCollectionFlag: false
      }
    },
    Storage: {
      region: config.cognito.REGION,
      bucket: config.constants.UPLOAD_S3_BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    }
  });

  ReactDOM.render(
    <Router>
      {/* <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/> */}
      <App />
    </Router>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();