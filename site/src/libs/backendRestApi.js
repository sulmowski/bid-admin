import { Auth } from "aws-amplify";
import Config from "../config";

export default class BackendRestApi {
  

  genericGet = async (get, callback) => {
    console.log("Send request GET:")
    console.log(get)

    const userToken = (await Auth.currentSession()).getIdToken().getJwtToken()
    console.log(userToken)

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` }
    };

    const queryExecute = function(callback) {
      fetch(Config.constants.BACKEND_BASE_URL+get, requestOptions)
        .then(response => response.json())
        .then(
          (result) => {
            console.log(result)
            if (typeof callback === 'function') {
              callback(null, result);
            } else {
              return result
            }
          },
          (error) => {
            console.log(error)
            if (typeof callback === 'function') {
              callback(error);
            } else {
              return error
            }
          }
        );
    }

    queryExecute(callback);
  }

  genericPost = async (get, data, callback) => {
    console.log("Send request POST:")
    console.log(get)
    console.log(data)

    const userToken = (await Auth.currentSession()).getIdToken().getJwtToken()
    console.log(userToken)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` },
      body: JSON.stringify(data)
    };

    const queryExecute = function(callback) {
      fetch(Config.constants.BACKEND_BASE_URL+get, requestOptions)
        .then(response => response.json())
        .then(
          (result) => {
            console.log(result)
            if (typeof callback === 'function') {
              callback(null, result);
            } else {
              return result
            }
          },
          (error) => {
            console.log(error)
            if (typeof callback === 'function') {
              callback(error);
            } else {
              return error
            }
          }
        );
    }

    queryExecute(callback);
  }


}
