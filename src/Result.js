import React, { Fragment } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';

function Result(props) {
  const { estimate } = props;
  let totalSqf = () => {
    let total = 0;
    estimate.measures.map((x) =>
      !isNaN(x.roomLength) ? (total += x.roomLength * (x.roomWidth || 1)) : null
    );
    return total;
  };
  let totalSqfPrice = () => {
    let total = 0;
    estimate.measures.map((x) =>
      !isNaN(x.roomLength)
        ? (total += x.roomLength * (x.roomWidth || 1) * x.sqfPrice)
        : null
    );
    return total;
  };
  let totalHours = () => {
    let total = 0;
    estimate.hours.map((x) => (total += x.hours * x.price));
    return total;
  };
  let totalMats = () => {
    let total = 0;
    estimate.material.map((x) => (total += x.quantity * x.price));
    return total;
  };
  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4}>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Square Ft: ${totalSqf()}`}
                secondary={`Price: $${totalSqfPrice().toFixed(2)}`}
              />
            </ListItem>
            ,
          </List>
        </Grid>
        <Grid item xs={6} sm={4}>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Hourly Charge`}
                secondary={`Price: $${totalHours().toFixed(2)}`}
              />
            </ListItem>
            ,
          </List>
        </Grid>
        <Grid item xs={6} sm={4}>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Material Charge`}
                secondary={`Price: $${totalMats().toFixed(2)}`}
              />
            </ListItem>
            ,
          </List>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6" align="center">
              Grand Total: ${(totalSqfPrice() + totalHours() + totalMats()).toFixed(2)} <Typography variant="caption">+Taxes</Typography>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Result;
