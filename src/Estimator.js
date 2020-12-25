import React from 'react'
import { useHistory } from "react-router-dom";

import styles from './styles/estimatorStyles';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



function Estimator(props) {
  const { classes } = props;
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/estimate/${id}`)
  
  }
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
          { props.estimates.map( estimate => (
            <Paper onClick={() => handleClick(estimate.id)} className={classes.paper}>{estimate.name}</Paper>
          ))}
        </Grid>
        </Grid>
    </Paper>
  )
}

export default withStyles(styles)(Estimator);