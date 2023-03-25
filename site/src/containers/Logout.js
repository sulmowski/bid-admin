import React, { useEffect } from 'react';
import { Auth } from "aws-amplify";

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function Logout(props) {
  useEffect(() => {
    onLoad();
  });
  async function onLoad() {
    await Auth.signOut().then(async data => {
      await delay(5000)
      props.userHasAuthenticated(false);
      props.setUser(null);
    })
    
    props.history.push("/");
  }

  return <div></div>
}