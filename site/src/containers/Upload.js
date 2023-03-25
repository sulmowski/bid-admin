import React, { useRef, useState, useEffect } from "react";
import "./Upload.css";
import Config from "../config"
// import Moment from 'moment-timezone';
import AwsUtils from '../libs/awsUtils'
import { UploadUtils } from "../libs/uploadUtils";
import BackendRestApi from '../libs/backendRestApi'
// import {Auth} from 'aws-amplify';
// import ELAutocomplete from '../components/ELAutocomplete'

import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { Alert } from '@material-ui/lab';
// import PublishIcon from '@material-ui/icons/Publish';
import HistoryIcon from '@material-ui/icons/History';
// import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

// const FileSaver = require('file-saver');

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    minWidth: 400,
    width: '100%',
    overflowWrap: "break-word"
  },
  paper: {
    // width: '80%'
    padding: 20
  },
  card: {
    marginTop: theme.spacing(1)
  },
  cardContent: {
    alignItems: 'center'
  },
  buttonProgress: {
    color: "blue",
    position: 'absolute',
    top: '50%',
    left: '90%',
    marginTop: -12,
    marginLeft: -12,
  },
  uploadButton: {
    minWidth: 300,
    maxWidth: 300,
    // marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4)
  },
  progress: {
    marginTop: theme.spacing(3),
    colorPrimary: "blue"
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "45%",
    // left: -130
  },
  uploadMessage: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
    // width: "100%",
    // left: -130
  },
  statusList: {
    width: '90%'
  },
  disclaimer:{
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: 'grey'
  }
}));

export default function Home(props) {
  const classes = useStyles();
  const file = useRef(null);
  const awsUtils = new AwsUtils();
  const backendRestApi = new BackendRestApi();

  // const [userId, setUserId] = React.useState(null);
  // const [userName, setUserName] = React.useState(null);
  // const [userEmail, setUserEmail] = React.useState(null);
  const [typesRecorveryItems, setTypesRecorveryItems] = useState([]);
  const [typesRecorveryMenu, setTypesRecorveryMenu] = useState(null);
  const [typesRecorveryLoaded, setTypesRecorveryLoaded] = useState(false);
  const [typesRecorverySeleted, setTypesRecorverySeleted] = useState("0");

  const [fileSelected, setFileSelected] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [progress, setProgress] = React.useState({});

  // const [tableValue, setTableValueSelf] = React.useState(null);
  // const [loadType, setLoadType] = React.useState("dl");


  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    // await awsUtils.getUserId(userId, setUserId);
    // await awsUtils.getUserName(userName, setUserName);
    // await awsUtils.getUserEmail(userEmail, setUserEmail);
    loadTypesRecorvery();
  }

  // const reloadTypesRecorvery = async () => {
  //   setTypesRecorveryItems([]);
  //   setTypesRecorveryMenu("");
  //   setTypesRecorverySeleted("0");
  //   setTypesRecorveryLoaded(false);
  //   loadTypesRecorvery();
  // }

  const loadTypesRecorvery = () => {
    const loadItemsCallback = async (err, data) => {
      if (err) { setTypesRecorveryLoaded(false) }

      setTypesRecorveryItems(data);
      // console.log(data);
      var menuItem = []
      // menuItem.push(<MenuItem key="0" value="0">Please choose</MenuItem>);
      Object.keys( data ).forEach( function ( key ) {
        // console.log(key);
        menuItem.push(<MenuItem key={key} value={key}>{data[key]['name']} - Allow upload: {data[key]['ext'].join(", ")}</MenuItem>);
      });
      setTypesRecorveryMenu(menuItem);
      setTypesRecorverySeleted("0");
      setTypesRecorveryLoaded(true);
    }
    backendRestApi.genericGet("typesRecorvery/getAll/", loadItemsCallback);
  }

  const artifactsHistoryOnClick = event => {
    event.preventDefault()
    props.history.push("/artifacts-history")
  }


  const getUploadStatusType = () => {
    if (Object.keys(progress).length === 0) {
      return "none"
    }
    if (Object.keys(progress).some(key => progress[key]['status'] === 'progress')) {
      return "progress"
    }
    if (Object.keys(progress).every(key => progress[key]['status'] === 'failed')) {
      return Config.uploadStatus.error
    }

    if (Object.keys(progress).some(key => progress[key]['status'] === 'failed')) {
      return Config.uploadStatus.warning
    }

    return Config.uploadStatus.success
  }

  const isUploadStatusError = () => {
    return getUploadStatusType() === Config.uploadStatus.error && success
  }

  const isUploadStatusWarning = () => {
    return getUploadStatusType() === Config.uploadStatus.warning && success
  }

  // const isUploadStatusSuccess = () => {
  //   return getUploadStatusType() === Config.uploadStatus.success && success
  // }

  const statusMapping = (status) => {
    if(status === "success") return "Moved to data quality validation manager"
    if(status === "failed") return "Upload failed"
  }

  function handleFileChange(event) {
    setSuccess(false);

    file.current = event.target.files;
    setFileSelected(Array.from(file.current).map(function (elem) {
      return elem.name;
    }).join(", "));
  }

  const handleButtonClick = async () => {
    if (!loading) {
      setLoading(true);
      setSuccess(false);
      const uploadUtils = new UploadUtils()
      for (let i = 0; i < file.current.length; i++) {
        await uploadUtils.s3Upload(file.current[i],
          setProgress,
          "Artifacts",
          i+1,
          typesRecorverySeleted
          ).catch(err => err)
      }
      file.current = null;
      setSuccess(true);
      setLoading(false);
    }
  };

  const getUploadStatusMessage = () => {
    const uploadResult = isUploadStatusError() ?
      {severity: "error", message: "No files have been successfully uploaded. "} :
      (
        isUploadStatusWarning() ?
        {severity: "warning", message: "Not all files have been successfully uploaded to data quality validation manager. "} :
        {severity: "info", message: "All files are being uploaded to data quality validation manager, check below. "}
      )

      return <Alert className={classes.uploadMessage} severity={uploadResult.severity}>
        {uploadResult.message}
        Below you can see upload results and generated Recorvery help file names.
      </Alert>
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Paper elevation={3} className={classes.paper} key="paper">
          <div><Typography variant="button">Choose which file you want to recorvery</Typography></div>
          <input
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Type of recorvery</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={typesRecorverySeleted}
              onChange={(event) => {
                setTypesRecorverySeleted(event.target.value)
              }}
            >
              {!typesRecorveryLoaded ? <MenuItem value={0}>Loading</MenuItem> : typesRecorveryMenu}
            </Select>
            <FormHelperText>Type of load</FormHelperText>
          </FormControl> 

          <div>
            <div>
              {
                fileSelected.length > 0 &&
                <Grid item lg={12}>
                  <Button
                    variant="contained"
                    color="default"
                    fullWidth={true}
                    component="span"
                    // disabled={typesRecorverySeleted == "0"}
                    className={classes.uploadButton}
                    onClick={handleButtonClick}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} display="inline" />}
                  </Button>
                </Grid>
              }
              {/* {(!loading && typesRecorverySeleted != "0") && */}
              {!loading &&
                <label htmlFor="raised-button-file">
                  <Grid item sm={12}>
                    <Button
                      variant="contained"
                      color="default"
                      fullWidth={true}
                      component="span"
                      className={classes.uploadButton}
                      startIcon={<AttachFileIcon />}
                    >
                      Choose files
                    </Button>
                  </Grid>
                </label>
              }
            </div>



            {(fileSelected.length > 0) && (<Typography style={{ width: "100%", overflowWrap: "break-word" }} variant="caption">Files selected: {fileSelected}</Typography>)}
            <div>
              {Object.keys(progress).length > 0 && getUploadStatusMessage()}
              <a href="/upload-history" style={{ textDecoration: 'none' }}>
                <Alert className={classes.uploadMessage} severity="info" href="/upload-history" onClick={artifactsHistoryOnClick} icon={<HistoryIcon fontSize="inherit"/>}>
                  Click here to go to the historical validation screen
                </Alert>
              </a>
            </div>

          </div>

          {/* <div style={{textDecoration: 'none'}} className={classes.disclaimer}>
          Please ensure any sensitive data has been pre-approved by the respective data owners prior to upload.
          </div> */}
          {/* {(fileSelected.length > 0 && success) && (<Typography variant="caption">Files uploaded to Recorvery help: {fileSelected}</Typography>)} */}
          {/* {JSON.stringify(progress)} */}
          {/* {JSON.stringify(progressArr)} */}

          {Object.keys(progress).reverse().map(key =>
            <Card variant="outlined" className={classes.card} key={'card' + key}>
              <CardContent className={classes.cardContent} key={'cardContent' + key}>
                <LinearProgress className={classes.progress} key={'progressBar' + key}
                  variant={progress[key]["status"] === "failed" ? "determinate" : "buffer"}
                  valueBuffer={progress[key]["buffer"]}
                  value={progress[key]["loaded"]} color={progress[key]["status"] === "failed" ? "secondary" : "primary"} />
                <ul className={classes.statusList}>
                  <li style={{ listStyleType: "none", overflowWrap: "break-word" }}><Typography variant="caption" key={'oldName' + key}>Original name: {progress[key]["fileName"]}</Typography> </li>
                  <li style={{ listStyleType: "none", overflowWrap: "break-word" }}><Typography variant="caption" key={'elName' + key}>Generated EL name: {progress[key]["awsFileName"]}</Typography></li>
                  <li style={{ listStyleType: "none", overflowWrap: "break-word" }}><Typography variant="caption" key={'status' + key}>Status: {statusMapping(progress[key]["status"])}</Typography></li>
                </ul>
              </CardContent>
            </Card>
          )}

        </Paper>
      </div>
    </div>
  );
}