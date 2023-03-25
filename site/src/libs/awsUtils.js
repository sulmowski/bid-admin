import { Auth } from "aws-amplify";
// import Config from "../config";

export default class AwsUtils {
  getAwsCredentials = async () => {
    const creds = await Auth.currentCredentials()
    return creds;
  }

  getUserToken = async () => {
    return (await Auth.currentSession()).getIdToken().getJwtToken()
  }

  getUserId = async (user=null, setUser=null) => {
    const cred = await this.getAwsCredentials()
    if (setUser !== null) setUser(cred.params.IdentityId)
  }

  getUserName = async (userName=null, setUserName=null) => {
    const user = await Auth.currentAuthenticatedUser()
    if (setUserName !== null) setUserName(user.username)
    return user.username
  }

  getUserEmail = async (userEmail=null, setUserEmail=null) => {
    const user = await Auth.currentAuthenticatedUser()
    if (setUserEmail !== null) setUserEmail(user.attributes.email)
  }

}
