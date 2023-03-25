import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
  alertInfo: {
    width: '100%',
    marginBottom: theme.spacing(2),
  }
}));

export default function ArtifactsDetail(props) {
  const classes = useStyles();
  // const awsUtils = new AwsUtils();
  const backendRestApi = new BackendRestApi();

  const [detailsArtifactsItems, setDetailsArtifactsItems] = useState([]);
  const [doesDetailsArtifactsLoaded, setDetailsArtifactsLoaded] = useState(false);
  const [detailsArtifactsMenu, setDetailsArtifactsMenu] = useState(null);
  const [detailsArtifactsSeleted, setDetailsArtifactsSeleted] = useState("0");

  const [detailsDictsItems, setDetailsDictsItems] = useState([]);
  const [doesDetailsDictsLoaded, setDetailsDictsLoaded] = useState(false);
  const [detailsDictsMenu, setDetailsDictsMenu] = useState(null);
  const [detailsDictsSeleted, setDetailsDictsSeleted] = useState("0");

  const { id } = props.match.params;
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    loadArtifacts()
    loadDicts()
  }


  const loadArtifacts = () => {
    const loadArtifactsItemsCallback = async (err, data) => {
      if (err) { setDetailsArtifactsItems([]) }
      else {
        setDetailsArtifactsItems(data)
        setDetailsArtifactsLoaded(true);
        setDetailsArtifactsSeleted("0");
        var menuItem = []
        Object.keys( data ).forEach( function ( key ) {
          // console.log(key);
          menuItem.push(<MenuItem key={data[key]['identity_id']} value={data[key]['identity_id']}>{data[key]['original_file_name']} - ready to recorvery as: {data[key]['upload_file_type']} (Status: {data[key]['status']})</MenuItem>);
        });
        setDetailsArtifactsMenu(menuItem);
      }
    }
    backendRestApi.genericGet("artifacts/getByUser/", loadArtifactsItemsCallback);
  }

  const loadDicts = () => {
    const loadDictsItemsCallback = async (err, data) => {
      if (err) { setDetailsDictsItems([]) }
      else {
        setDetailsDictsItems(data)
        setDetailsDictsLoaded(true);
        setDetailsDictsSeleted("0");
        var menuItem = []
        menuItem.push(<MenuItem key="0" value="0">Please choose</MenuItem>);
        Object.keys( data ).forEach( function ( key ) {
          // console.log(key);
          menuItem.push(<MenuItem key={key} value={key}>{data[key]['name']} - {data[key]['desc']} (Cost: {data[key]['cost']})</MenuItem>);
        });
        setDetailsDictsMenu(menuItem);
      }
    }
    backendRestApi.genericGet("dictionaries/getAll/", loadDictsItemsCallback);
  }

  const alertOnClick = event => {
    event.preventDefault()
    props.history.push("/jobs-history")
  }

  const handleButtonClick = async () => {
    console.log(detailsArtifactsSeleted)
    console.log(detailsDictsSeleted)

    const createJobCallback = async (err, data) => {
      if (err) { 
        console.log(err); 
      }
      else {
        console.log(data);
      }
    }
    backendRestApi.genericPost('jobs/create', {
      'artefact_id': detailsArtifactsSeleted,
      'dictionaries_id': detailsDictsSeleted
    }, createJobCallback)

  };

  return (
  <div className={classes.root}>
    <div className={classes.wrapper}>
    
    <a href="/artficats-history" style={{ textDecoration: 'none' }}>
      <Alert className={classes.alertInfo} icon={<ArrowBackIcon fontSize="inherit" />} severity="info" onClick={alertOnClick}>
      Click here to return to artifacts history.
      </Alert>
    </a>

    <Paper elevation={3} className={classes.paper} key="paper">
        <div><Typography variant="button">Choose which file you want to recorvery</Typography></div>

    {!doesDetailsArtifactsLoaded && <div>Loading <CircularProgress /></div>}
    {doesDetailsArtifactsLoaded && 
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Choose artifact to recorvery</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={detailsArtifactsSeleted}
          onChange={(event) => {
            setDetailsArtifactsSeleted(event.target.value)
          }}
        >
          {!doesDetailsArtifactsLoaded ? <MenuItem value={0}>Loading</MenuItem> : detailsArtifactsMenu}
        </Select>
        <FormHelperText>Type of load</FormHelperText>
      </FormControl> 
      </div>
    }

    {!doesDetailsDictsLoaded && <div>Loading <CircularProgress /></div>}
    {doesDetailsDictsLoaded && 
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label2">Choose artifact to recorvery</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label2"
          id="demo-simple-select-helper2"
          value={detailsDictsSeleted}
          onChange={(event) => {
            setDetailsDictsSeleted(event.target.value)
          }}
        >
          {!doesDetailsDictsLoaded ? <MenuItem value={0}>Loading</MenuItem> : detailsDictsMenu}
        </Select>
        <FormHelperText>Type of load</FormHelperText>
      </FormControl> 
      </div>
    }

    <div>
      <Button
        variant="contained"
        color="default"
        fullWidth={true}
        component="span"
        // disabled={typesRecorverySeleted == "0"}
        className={classes.uploadButton}
        onClick={handleButtonClick}
        startIcon={<CloudUploadIcon />}
      >Start job</Button>
    </div>
    
    </Paper>
    </div>
  </div>
  )
}