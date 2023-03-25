import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  panel: {
    marginTop: theme.spacing(5),
    border: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: 'rgba(40, 94, 220, 0.05)',
    minHeight: 65,
    '&$expanded': {
      minHeight: 65,
    },
    panelSummary: {
      backgroundColor: "white"
    }
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
        {Config.routes.map((view, index) => {
          return (
          <div key={"div" + index}>
            <ExpansionPanel expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}
              className={classes.panel}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="button" className={classes.heading}>{view.viewName}</Typography>
            <Typography className={classes.secondaryHeading}>{view.viewDescription}</Typography>
          </ExpansionPanelSummary>
          {view.routes.map((route, routeIndex) => {
              return (<ExpansionPanelDetails className={classes.panelSummary} key={"extension" + index + routeIndex}>
                <Typography variant="button">
                  <Link to={route["path"]} style={{ color: 'black', textDecoration: 'none'}}>
                    {route["description"]}
                  </Link>
                </Typography>
              </ExpansionPanelDetails>)
            })}
            </ExpansionPanel>
          </div>
          )
        })}
    </div>
  );
}