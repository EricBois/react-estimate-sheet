import React, { Fragment, useEffect, useState, useContext } from 'react';
import useInputState from '../../hooks/useInputState';
import FirebaseContext from "../../firebase/context";
import MeasureList from '../MeasureList';
import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import styles from '../../styles/measurementsStyles';

function MeasurementsForm(props) {
  const { classes, dispatch, estimate } = props;
  const { firebase } = useContext(FirebaseContext);

  const [roomLength, handleChangeLength, resetLength] = useInputState('');
  const [sqfPrice, handleChangeSqfPrice, resetSqfPrice] = useInputState('0');
  const [roomWidth, handleChangeWidth, resetWidth] = useInputState('');
  const [inputZone, setInputZone] = useState(false);

  const handleSubmitMeasure = () => {
    return dispatch({
      type: 'ADDMEASURE',
      id: estimate.id,
      measures: { roomLength, roomWidth, sqfPrice },
    });
  };
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
  useEffect(() => {
    const ac = new AbortController();
    // sync material with db
    const editEstimate = async () => {
      return await firebase.db
        .collection('estimates')
        .doc(estimate.id.toString())
        .update({
          measures: estimate.measures,
        });
    };
    editEstimate();
    return () => {
      ac.abort();
    };
  }, [estimate.measures, estimate.id]);
  const handleClickInputZone = () => {
    setInputZone(!inputZone);
  };
  return (
    <Fragment>
      <Paper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitMeasure();
            setInputZone(false);
            resetLength();
            resetWidth();
            resetSqfPrice();
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Measurements
              </Typography>
              {!inputZone && (
                <Button
                  onClick={() => handleClickInputZone()}
                  color="secondary"
                  variant="outlined"
                  fullWidth
                >
                  Add Zone
                </Button>
              )}
              {inputZone && (
                <Button
                  onClick={() => handleClickInputZone()}
                  color="secondary"
                  variant="outlined"
                  fullWidth
                >
                  Cancel
                </Button>
              )}
            </Grid>
            {!inputZone ? (
              <Fragment>
                <Grid item xs={4}>
                  <TextField
                    autoFocus
                    variant="outlined"
                    required
                    className={classes.textfield}
                    value={roomLength}
                    onChange={handleChangeLength}
                    margin="normal"
                    type="number"
                    label="Length"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    value={roomWidth}
                    onChange={handleChangeWidth}
                    margin="normal"
                    type="number"
                    label="Width"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    value={sqfPrice}
                    onChange={handleChangeSqfPrice}
                    margin="normal"
                    type="number"
                    label="Sqf Price"
                  />
                </Grid>
              </Fragment>
            ) : (
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.textfield}
                  value={roomLength}
                  onChange={handleChangeLength}
                  margin="normal"
                  label="Zone Name"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                size="small"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Divider />
      {estimate && (
        <List dense>
          {estimate.measures.map((measure, index) => (
            <Fragment key={index}>
              <MeasureList
                measure={measure}
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
      {estimate && (
        <Paper>
          <Typography align="center" variant="subtitle1">
            Total: {totalSqf()} Sqf (${totalSqfPrice().toFixed(2)})
          </Typography>
        </Paper>
      )}
    </Fragment>
  );
}

export default withStyles(styles)(MeasurementsForm);
