import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from "aws-amplify";
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Alert from '@material-ui/lab/Alert';
// import ColoredLine from '../components/ColoredLine'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  useEffect(() => {
    handleSSO();
  }, []);
  const [didLogin, setDidLogin] = useState(false);

  // async function handleLoginSubmit(event) {
  //   setLoginLoading(true);
  //   setErrorMessage('');
  //   event.preventDefault();
  //   await Auth.signIn(login, password).then(async user => {
  //     setUser(user);
  //     setLoginLoading(false);
  //     if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
  //       setNewPasswordRequired(true);
  //     }
  //     else {
  //       props.userHasAuthenticated(true);
  //     }
      
  //   }).catch(e => {
  //     const errorMessage = e.hasOwnProperty('message') ? e.message : "Unknown error";
  //     setErrorMessage(errorMessage);
  //     setLoginLoading(false);
  //   })
  // }

  // async function handleSetNewPasswordSubmit(event) {
  //   setLoginLoading(true);
  //   setErrorMessage('');
  //   event.preventDefault();
  //   const { requiredAttributes } = user.challengeParam;
  //     await Auth.completeNewPassword(
  //       user,               // the Cognito User Object
  //       newPassword, requiredAttributes,       // the new password
  //     ).then(user => {
  //       setLoginLoading(false)
  //       props.userHasAuthenticated(true)
  //     }).catch(e => {
  //       setErrorMessage("Failed to set new password");
  //     });
  //   setLoginLoading(false);
  // }
  // const [login, setLogin] = useState('');
  // const [password, setPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [isLoginLoading, setLoginLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [user, setUser] = useState('');
  // const [newPasswordRequired, setNewPasswordRequired] = useState(false)
  // function handleLoginChange(e) {
  //   setLogin(e)
  // }
  // function handlePasswordChange(e) {
  //   setPassword(e)
  // }
  // function handleNewPasswordChange(e) {
  //   setNewPassword(e)
  // }

  const handleSSO = async (e) => {
    await Auth.federatedSignIn().then(cred => {setDidLogin(cred)}).catch(e => {setDidLogin(e)})
  }
  const classes = useStyles();

  return (
    <div className={classes.login}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <CircularProgress />
      {/* <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        //                     disabled
        className={classes.submit}
        size="large"
        onClick={handleSSO}
      >
        Login with AD SSO
                  </Button>
      <ColoredLine
        color="gray"
        width={250}
        height={3} />
      <Typography component="h1" variant="h5">
        Sign in with Cognito
        </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Cognito username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => { handleLoginChange(e.target.value) }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => { handlePasswordChange(e.target.value) }} />
        {newPasswordRequired && <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="New password"
          type="password"
          id="newPassword"
          autoComplete="new-password"
          onChange={(e) => { handleNewPasswordChange(e.target.value) }} />}
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          disabled={login.length <= 0 || password.length <= 0 || (newPasswordRequired ? (newPassword.length <= 0) : false)}
          onClick={newPasswordRequired ? handleSetNewPasswordSubmit : handleLoginSubmit}
        >
          {newPasswordRequired ? "Set new password" : "Login to Recorvery help"}
        </Button>
        {isLoginLoading ? (
          <LinearProgress color="secondary" />
        ) : <div></div>}
        {errorMessage.length > 0 && (<Alert severity="error">{errorMessage}</Alert>)
        }
        {newPasswordRequired && (<Alert severity="info">This is your first login - please set new password</Alert>)}
      </form> */}
    </div>

  );
}