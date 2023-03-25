import React, { useEffect } from 'react';
import { Auth } from "aws-amplify";
import CircularProgress from '@material-ui/core/CircularProgress';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default function SsoLogin(props) {
  useEffect(() => {
    onLoad();
  });
  async function onLoad() {
    let cognitoUser = null;
    for (let i = 0; cognitoUser == null && i<10; i++) {
      await delay(500);
      await Auth.currentAuthenticatedUser()
        .then(user => {
          cognitoUser = user
          props.setUser(user)
          props.userHasAuthenticated(true);
          // props.reloadGlueTables()
          if(cognitoUser != null){
            props.history.push("/")
          }
        })
        .catch(async e => {
          await delay(500);
        })
    }
    if(cognitoUser == null) props.history.push("/");
  }

  return <CircularProgress />
}