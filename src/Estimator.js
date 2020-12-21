import React, { useContext } from 'react'
import NavBar from './NavBar';

import {EstimateContext} from './context/estimate.context';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function Estimator() {
  const estimates = useContext(EstimateContext);
  return (
    <Paper
      style={{
        padding: 0,
        margin: 0,
        height: '100vh',
        backgroundColor: '#fafafa',
      }}
    >
      <NavBar />
      <Grid container justify="center">
        <Grid item xs={11} md={8} lg={4}>
          { estimates.map( estimate => (
            <h1>{estimate.name}</h1>
          ))}
        </Grid>
        </Grid>
    </Paper>
  )
}

export default Estimator;