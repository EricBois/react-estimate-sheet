import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import EstimateCard from './EstimateCard';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

function EstimateList(props) {
  const { estimates, dispatch } = props;

  return (
    <Paper elevation={20} style={{ maxWidth: '600px', minHeight: '200px', margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5" style={{fontFamily: 'Russo One'}}>Estimate List</Typography>
          <Divider />
          <List component="nav" aria-label="contacts">
            {estimates.length === 0 && (
              <ListItem component={Link} to="/create" button>
                Create Estimate
              </ListItem>
            )}
            {estimates.map((estimate) => (
              <Fragment key={estimate.id}>
                <EstimateCard
                  estimate={estimate}
                  dispatch={(props) => dispatch(props)}
                />
              </Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EstimateList;
