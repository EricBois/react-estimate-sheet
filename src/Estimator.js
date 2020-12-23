import React from 'react'
import estimateReducer from './reducers/estimate.reducer';
import useLocalStorageReducer from './hooks/useLocalStorageReducer';

import styles from './styles/estimatorStyles';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



function Estimator(props) {
  const { classes } = props;
  const [estimates] = useLocalStorageReducer("estimates", [], estimateReducer);
  return (
    <Paper
      style={{
        padding: 0,
        margin: 0,
        height: '100vh',
        backgroundColor: '#fafafa',
      }}
    >
      <Grid container justify="center">
        <Grid item xs={11} md={8} lg={4}>
          { estimates.map( estimate => (
            <Paper className={classes.paper}>{estimate.name}</Paper>
          ))}
        </Grid>
        </Grid>
    </Paper>
  )
}

export default withStyles(styles)(Estimator);