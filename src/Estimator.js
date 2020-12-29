import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import EstimateList from './EstimateList';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

function Estimator(props) {
  const { estimates, dispatch } = props;

  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List component="nav" aria-label="contacts">
            {estimates.length === 0 && (
              <ListItem component={Link} to="/create" button>
                No Estimate Yet ... Create Estimate
              </ListItem>
            )}
            {estimates.map((estimate) => (
              <Fragment key={estimate.id}>
                <EstimateList
                  estimate={estimate}
                  dispatch={(props) => dispatch(props)}
                />
                <Divider />
              </Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Estimator;
