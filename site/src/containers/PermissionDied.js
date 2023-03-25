import React from 'react';
import Config from "../config"
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

export default function PermissionDied(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <h1>Permission died - group</h1>
    </div>
  );
}