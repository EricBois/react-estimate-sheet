import React, { Fragment, useEffect } from 'react';
import useInputState from '../hooks/useInputState';
import { database } from '../firebase';
import { withStyles } from '@material-ui/styles';
import HoursList from './HoursList';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import styles from '../styles/measurementsStyles';

function HoursForm(props) {
  const { classes, dispatch, estimate } = props;

  const [item, handleChangeItem, resetItem] = useInputState('');
  const [hours, handleChangeHours, resetHours] = useInputState('');
  const [price, handleChangePrice, resetPrice] = useInputState('');

  const handleSubmitHours = () => {
    dispatch({
      type: 'ADDHOURS',
      id: estimate.id,
      hours: { item, hours, price },
    });
    resetItem();
    resetHours();
    resetPrice();
  };
  let totalHours = () => {
    let total = 0;
    estimate.hours.map((x) => (total += x.hours * x.price));
    return total;
  };
  useEffect(() => {
    const ac = new AbortController();
    // sync material with db
    const editEstimate = async () => {
      return await database
        .collection('estimates')
        .doc(estimate.id.toString())
        .update({
          hours: estimate.hours,
        });
    };
    editEstimate();
    return () => {
      ac.abort();
    };
  }, [estimate.hours, estimate.id]);
  return (
    <Fragment>
      <Paper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitHours();
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Hours
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                variant="outlined"
                required
                className={classes.textfield}
                value={item}
                onChange={handleChangeItem}
                margin="normal"
                label="Item Name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={hours}
                required
                onChange={handleChangeHours}
                margin="normal"
                type="number"
                label="Hours"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={price}
                required
                onChange={handleChangePrice}
                margin="normal"
                type="number"
                label="Price"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                size="small"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Divider />
      {estimate && estimate.hours && (
        <List dense>
          {estimate.hours.map((hour, index) => (
            <Fragment key={index}>
              <HoursList
                hour={hour}
                index={index}
                estimate={estimate}
                dispatch={(props) => dispatch(props)}
              />
              <Divider />
            </Fragment>
          ))}
        </List>
      )}
      <Divider />

      <Paper>
        <Typography align="center" variant="subtitle1">
          Total: ${totalHours()}
        </Typography>
      </Paper>
    </Fragment>
  );
}

export default withStyles(styles)(HoursForm);
