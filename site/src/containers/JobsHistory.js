import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import { Alert } from '@material-ui/lab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SyncIcon from '@material-ui/icons/Sync';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {Router,Link, Route} from 'react-router-dom';
// import FileAlerts from "./FileAlerts"
// import Config from '../config'
// import AwsUtils from '../libs/awsUtils'
import BackendRestApi from '../libs/backendRestApi'
import InternalLib from '../libs/internalLib'

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
  alertInfo: {
    width: '100%',
    marginBottom: theme.spacing(2),
  }
}));
export default function JobsHistory(props) {
  const classes = useStyles();
  // const awsUtils = new AwsUtils();
  const backendRestApi = new BackendRestApi();
  const internalLib = new InternalLib();

  const [historyItems, setHistoryItems] = useState([]);
  const [doesHistoryLoaded, setHistoryLoaded] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);
  async function onLoad() {
    loadJobs();
  }
  const reloadJobs = async () => {
    setHistoryItems([])
    setHistoryLoaded(false)
    loadJobs();
  }

  const loadJobs = async () => {
    const loadItemsCallback = async (err, data) => {
      if (err) { setHistoryItems([]) }
      console.log(data)
      setHistoryItems(data)
      setHistoryLoaded(true);
    }
    backendRestApi.genericGet("jobs/getByUser/", loadItemsCallback);
  }

  const alertOnClick = event => {
    event.preventDefault()
    props.history.push("/create-job")
  }

  const handleShowButtonClick = (ID) => {
    // event.preventDefault()
    props.history.push('/jobs-detail/' + ID)
  };

  const handleRestartButtonClick = async (ID) => {
    const restartJobsCallback = async (err, data) => {
      if (err) { 
        console.log("ERROR"); 
        console.log(err); 
      }
      else {
        console.log(data);
      }
    }
    backendRestApi.genericGet("jobs/"+ID+"/setStatus/Pending", restartJobsCallback);
  };

  const handlePauseButtonClick = async (ID) => {
    const PauseJobsCallback = async (err, data) => {
      if (err) { 
        console.log("ERROR"); 
        console.log(err); 
      }
      else {
        console.log(data);
      }
    }
    backendRestApi.genericGet("jobs/"+ID+"/setStatus/Pause", PauseJobsCallback);
  };

  const handleContinueButtonClick = async (ID) => {
    const ContinueJobsCallback = async (err, data) => {
      if (err) { 
        console.log("ERROR"); 
        console.log(err); 
      }
      else {
        console.log(data);
      }
    }
    backendRestApi.genericGet("jobs/"+ID+"/setStatus/Continue", ContinueJobsCallback);
  };

  const adjustLineBreaks = details => {
    return details.replace("\n","<br/>")
  }
  const value_a = 'a'
  return (<div className={classes.table}>
    <a href="/upload" style={{ textDecoration: 'none' }}
    ><Alert className={classes.alertInfo} icon={<ArrowBackIcon fontSize="inherit" />} 
    severity="info" onClick={alertOnClick}>
      Click here to return to upload screen
                          </Alert></a>
    <MaterialTable
      title="Jobs ready to recorvery"
      style={{
        whiteSpace: "normal",
        wordWrap: "break-word"
      }}
      icons={{
        Check: Check,
        DetailPanel: ChevronRight,
        Delete: DeleteOutline,
        Export: SaveAlt,
        Filter: FilterList,
        FirstPage: FirstPage,
        LastPage: LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft,
        Search: Search,
        ThirdStateCheck: Remove,
        Clear: Clear,
        ResetSearch: Clear,
        ViewColumn: ViewColumn,
        SortArrow: ArrowDownward
      }}
      columns={[
        {
          title: 'Artifact name', field: 'artefact_name',
          cellStyle: {
            fontWeight: 'bold',
            width: '5%'
          },
        },
        {
          title: 'Dictionarie', field: 'dictionaries_id',
          cellStyle: {
            width: '5%'
          },
        },
        {
          title: 'Status', field: 'status',
          // lookup: { 0: 'In progress', 1: 'Success', 2: "Error" },
          cellStyle: {
            width: '2%'
          },
        },
        {
          title: 'Paid', field: 'pay_status',
          // lookup: { 0: 'In progress', 1: 'Success', 2: "Error" },
          cellStyle: {
            width: '2%'
          },
        },
        { 
          title: 'Create at', field: 'createdAt', type: 'datetime', defaultSort: 'desc',
          render: rowData => internalLib.timeConverter(rowData.updatedAt),
          cellStyle: {
            width: '10%'
          },
        },
        { 
          title: 'Modify at', field: 'updatedAt', type: 'datetime', defaultSort: 'desc',
          render: rowData => internalLib.timeConverter(rowData.updatedAt),
          cellStyle: {
            width: '10%'
          },
        },
        { title: 'Details', field: 'file_name',
          render: rowData => (
            <div>
              <Button
                variant="contained"
                color="default"
                fullWidth={true}
                component="span"
                className={classes.uploadButton}
                onClick={() => handleShowButtonClick(rowData.identity_id)}
                startIcon={<CloudUploadIcon />}
              >Show me</Button>
            </div>
          )
        },
        { title: 'Actions', field: 'file_name',
          render: rowData => (
            <div>
              <Button
                variant="contained"
                color="default"
                fullWidth={true}
                component="span"
                className={classes.uploadButton}
                onClick={() => handleRestartButtonClick(rowData.identity_id)}
                startIcon={<CloudUploadIcon />}
              >Restart</Button>
              <Button
                variant="contained"
                color="default"
                fullWidth={true}
                component="span"
                className={classes.uploadButton}
                onClick={() => handlePauseButtonClick(rowData.identity_id)}
                startIcon={<CloudUploadIcon />}
              >Pause</Button>
              <Button
                variant="contained"
                color="default"
                fullWidth={true}
                component="span"
                className={classes.uploadButton}
                onClick={() => handleContinueButtonClick(rowData.identity_id)}
                startIcon={<CloudUploadIcon />}
              >Continue</Button>
            </div>
          )
        },
      ]}
      data={historyItems}
      options={{
        sorting: true,
        emptyRowsWhenPaging: false,
        pageSize: 20,
        tableLayout: "auto",
        rowStyle: rowData => ({
          backgroundColor: rowData.status == "New" ? blue[100] : (rowData.status == "Success" ? green[100] : red[100]),
          borderBottom: "2px solid rgba(0,0,0,0.20)",
        })
      }}
      actions={[
        {
          icon: SyncIcon,
          tooltip: 'Refresh history status',
          isFreeAction: true,
          onClick: reloadJobs
        }
      ]}
    />
    {!doesHistoryLoaded && <div>Loading <CircularProgress /></div>}
  </div>
  )
}