import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import Config from "./config"
import AwsUtils from './libs/awsUtils'
import BackendRestApi from './libs/backendRestApi'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { indigo } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CachedIcon from '@material-ui/icons/Cached';
import Tooltip from '@material-ui/core/Tooltip';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  root: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 15
  },
  menuButton: {
    marginRight: theme.spacing(6)
  },
  title: {
    flexGrow: 1,
  },
  userText: {
    marginRight: theme.spacing(2),
    fontSize: 16
  },
  submenuParent: {
    background: "rgba(40, 94, 220, 0.25)",
    '&:hover': {
      background: "rgba(40, 94, 220, 0.5)",
    }
  },
  refreshButton: {
    marginRight: theme.spacing(2)
  }
}));

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [submenuOpenDict, setSubmenuOpenDict] = React.useState(
    Config.routes
      .map(x => (x.viewName))
      .reduce((obj, item) => Object.assign(obj, { [item]: false }), {})
  );
  const [tables, setTables] = React.useState([])
  const [didTablesLoaded, setTablesLoaded] = React.useState(false)

  const anchorRef = React.useRef(null);
  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(indigo[500]),
      backgroundColor: indigo[500],
      '&:hover': {
        backgroundColor: indigo[800],
      },
    },
  }))(Button);

  const classes = useStyles();

  useEffect(() => {
    onLoad();
  }, []);

  const awsUtils = new AwsUtils();

  const reloadGlueTables = () => {
      awsUtils.getDetailedTablesInfo(tables, setTables, setTablesLoaded, "");
  }

  async function onLoad() {
    try {
      await Auth.currentAuthenticatedUser()
        .then(user => {
          console.log("COGNITO")
          console.log(user)

          setUser(user)
          if ("cognito:groups" in user.signInUserSession.accessToken.payload && user.signInUserSession.accessToken.payload["cognito:groups"].includes('admin')){
            userHasAuthenticated(true);
            console.log(user.signInUserSession.accessToken.payload["cognito:groups"])
          }else{
            userHasAuthenticated("You are not a admin");
            userHasAuthenticated(false);
            props.history.push("/permissionDied");
          }
        }
        )
        .catch(async e => {
          console.log("Cognito Error")
          console.log(e)
          await Auth.signOut(x => {
            userHasAuthenticated(false)
            setUser(null)
          })
        })
    }
    catch (e) {
      props.history.push("/login");
    }

    setIsAuthenticating(false);
  }

  const getUserId = () => {
    if (user.hasOwnProperty('username')) {
      return user.username;
    }
    return '';
  }

  const getUserEmail = () => {
    if (user.attributes.hasOwnProperty('email')) {
      return user.attributes.email;
    }
    return '';
  }

  const handleToggle = () => {
    if (isAuthenticated)
      setOpen(prevOpen => !prevOpen);
  };

  const refreshMetadata = () => {
    setTablesLoaded(false);
    awsUtils.getDetailedTablesInfo(tables, setTables, setTablesLoaded, "");
  }
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    const submenuCopy = JSON.parse(JSON.stringify(submenuOpenDict))
    Object.keys(submenuCopy).forEach(x => submenuCopy[x] = false)
    setSubmenuOpenDict(submenuCopy)
  };

  return (
    !isAuthenticating && (
      <div className="App">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
            <Tooltip title="Open page menu">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                onClick={handleToggle} ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true">
                <MenuIcon />
              </IconButton>
              </Tooltip>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper >
                      <ClickAwayListener onClickAway={handleClose}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              Menu
                            </ListSubheader>
                          }
                          className={classes.root}
                        >
                          <Link to="/" key={"home"} style={{ color: 'black', textDecoration: 'none' }}>
                            <ListItem button>
                              <ListItemText primary="Home" />
                            </ListItem>
                          </Link>
                          {Config.routes.map((view, index) => {
                            return (
                              <div key={"div" + index}>
                                <ListItem button onClick={() => {
                                  const submenuCopy = JSON.parse(JSON.stringify(submenuOpenDict))
                                  submenuCopy[view.viewName] = !submenuCopy[view.viewName]
                                  setSubmenuOpenDict(submenuCopy)
                                }} className={classes.submenuParent}>
                                  <ListItemText primary={view.viewName} />
                                  {submenuOpenDict[view.viewName] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                {view.routes.map((route, routeIndex) => {
                                  return (
                                    <Collapse in={submenuOpenDict[view.viewName]} timeout="auto" unmountOnExit key={"collapse" + index + routeIndex}>
                                      <List component="div" disablePadding>
                                        <Link to={route["path"]} key={index} style={{ color: 'black', textDecoration: 'none' }}>
                                          <ListItem button className={classes.nested}>
                                            <ListItemText primary={route["description"]} />
                                          </ListItem>
                                        </Link>
                                      </List>
                                    </Collapse>)
                                })}
                              </div>
                            )
                          })}
                          <Link to="/logout" key={"logout"} style={{ color: 'black', textDecoration: 'none' }}>
                            <ListItem button>
                              <ListItemText primary="Logout" />
                            </ListItem>
                          </Link>
                        </List>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Typography variant="h6" className={classes.title} align="left">
              <Tooltip title="Go back to home screen">
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Recorvery help Webservice
                    </Link>
              </Tooltip>
              </Typography>

              {(isAuthenticated || user != null) &&
                <div>
                  <Typography variant="caption" className={classes.userText}>Logged as: {getUserEmail()}</Typography>
                  {/* <Tooltip title="Fetch latest information about Recorvery help data structures">
                    <ColorButton variant="outlined" color="inherit" onClick={refreshMetadata}
                      className={classes.refreshButton}
                      startIcon={<CachedIcon />}>
                      Refresh metadata </ColorButton>
                  </Tooltip> */}
                  <Link style={{ textDecoration: 'none' }} to="/logout" ><ColorButton variant="outlined" color="inherit"
                    className={classes.logoutButton}> Logout </ColorButton></Link>
                </div>
              }
            </Toolbar>
          </AppBar>
        </div>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Routes appProps={{ isAuthenticated, userHasAuthenticated, setUser, tables, didTablesLoaded, reloadGlueTables }} />
          </div>
          {Config.constants.BASE_URL}
        </Container>
      </div>
    )
  );
}

export default withRouter(App);