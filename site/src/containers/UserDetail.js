import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import JSONPretty from 'react-json-prettify';
// import red from '@material-ui/core/colors/red';
// import blue from '@material-ui/core/colors/blue';
// import green from '@material-ui/core/colors/green';
// import Link from '@material-ui/core/Link';
// import AwsUtils from '../libs/awsUtils'
import BackendRestApi from '../libs/backendRestApi'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 1200,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  multiline: {
    whiteSpace: "pre-wrap",
    textAlign: "left"
  },
  leftText: {
    width: "1600px",
    whiteSpace: "pre-wrap",
    textAlign: "left"
  },
  alertInfo: {
    width: '100%',
    marginBottom: theme.spacing(2),
  }
}));

export default function UserDetail(props) {
  const classes = useStyles();
  // const awsUtils = new AwsUtils();
  const backendRestApi = new BackendRestApi();
  const [detailsItems, setDetailsItems] = useState([]);
  const [doesDetailsLoaded, setDetailsLoaded] = useState(false);
  const { id } = props.match.params;
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const loadItemsCallback = async (err, data) => {
      if (err) { setDetailsItems([]) }

      setDetailsItems(data)
      setDetailsLoaded(true);
      console.log(data)
    }
    // backendRestApi.genericGet("users/getMe", loadItemsCallback);
    backendRestApi.genericGet("users/getById/"+id, loadItemsCallback);
  }
  const alertOnClick = event => {
    event.preventDefault()
    props.history.push("/users-all")
  }
  return (
  <div className={classes.table}>
    <a href="/users-all" style={{ textDecoration: 'none' }}>
      <Alert className={classes.alertInfo} icon={<ArrowBackIcon fontSize="inherit" />} severity="info" onClick={alertOnClick}>
      Click here to return to Jobs history.
      </Alert>
    </a>

    {!doesDetailsLoaded && <div>Loading <CircularProgress /></div>}
    {doesDetailsLoaded && 
    <Paper elevation={3}>
      <Typography variant="h3" gutterBottom>
        {detailsItems.identity_id}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        {detailsItems.login}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        {detailsItems.status}
      </Typography>
      <div className={classes.leftText}>
        <JSONPretty json={detailsItems} />
      </div>
    </Paper>
    }
    
  </div>
  )
}