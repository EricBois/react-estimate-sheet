import React, { useState } from 'react';
import MeasurementsForm from './MeasurementsForm';
import HoursForm from './HoursForm';
import MaterialForm from './MaterialForm';
import Result from './Result';

import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BallotIcon from '@material-ui/icons/Ballot';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';
import styles from '../styles/estimateStyles';

function Estimate(props) {
  const { estimate, classes, dispatch } = props;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className={classes.container} p={1}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Grid container>
      {estimate && (
        <Grid item xs={12}>
          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<AssignmentIcon />} label="Measure" />
              <Tab icon={<AccessTimeIcon />} label="Hours" />
              <Tab icon={<BallotIcon />} label="Material" />
              <Tab icon={<AssignmentTurnedInIcon />} label="Result" />
            </Tabs>
          </Paper>

          <TabPanel value={value} index={0}>
            <MeasurementsForm
              estimate={estimate}
              dispatch={(props) => dispatch(props)}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HoursForm
              estimate={estimate}
              dispatch={(props) => dispatch(props)}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MaterialForm
              estimate={estimate}
              dispatch={(props) => dispatch(props)}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Result estimate={estimate} />
          </TabPanel>
        </Grid>
      )}
    </Grid>
  );
}

export default withStyles(styles)(Estimate);
