import React, { Fragment, useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../firebase/context';
import MeasureList from '../MeasureList';
import { withStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import validationMeasureSchema from '../validation/validationMeasureSchema';

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

  const [inputZone, setInputZone] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      roomLength: '',
      roomWidth: '',
      sqfPrice: '',
    },
    validationSchema: validationMeasureSchema,
    onSubmit: (values) => {
      dispatch({
        type: 'ADDMEASURE',
        id: estimate.id,
        measures: {
          roomLength: values.roomLength,
          roomWidth: values.roomWidth,
          sqfPrice: values.sqfPrice,
        },
      });
    },
  });

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
    const abortController = new AbortController();
    // sync material with db
    const editEstimate = async () => {
      try {
        await firebase.db
        .collection('estimates')
        .doc(estimate.id.toString())
        .update({
          measures: estimate.measures,
        });
        await setInputZone(false);
      }catch(err) {
        setError(err)
      }
    };
    editEstimate();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimate.measures]);

  const handleClickInputZone = () => {
    setInputZone(!inputZone);
  };

  return (
    <Fragment>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
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
                    value={formik.values.roomLength}
                    onChange={formik.handleChange}
                    margin="normal"
                    type="number"
                    label="Length"
                    name="roomLength"
                    error={
                      formik.touched.roomLength &&
                      Boolean(formik.errors.roomLength)
                    }
                    helperText={
                      formik.touched.roomLength && formik.errors.roomLength
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    value={formik.values.roomWidth}
                    onChange={formik.handleChange}
                    margin="normal"
                    type="number"
                    label="Width"
                    name="roomWidth"
                    error={
                      formik.touched.roomWidth &&
                      Boolean(formik.errors.roomWidth)
                    }
                    helperText={
                      formik.touched.roomWidth && formik.errors.roomWidth
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    value={formik.values.sqfPrice}
                    onChange={formik.handleChange}
                    margin="normal"
                    type="number"
                    label="Sqf Price"
                    name="sqfPrice"
                    error={
                      formik.touched.sqfPrice && Boolean(formik.errors.sqfPrice)
                    }
                    helperText={
                      formik.touched.sqfPrice && formik.errors.sqfPrice
                    }
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
                  value={formik.values.roomLength}
                  onChange={formik.handleChange}
                  margin="normal"
                  label="Zone Name"
                  name="roomLength"
                  error={
                    formik.touched.roomLength &&
                    Boolean(formik.errors.roomLength)
                  }
                  helperText={
                    formik.touched.roomLength && formik.errors.roomLength
                  }
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
          { error && <h6>error</h6>}
          <Typography align="center" variant="subtitle1">
            Total: {totalSqf().toFixed(2)} Sqf (${totalSqfPrice().toFixed(2)})
          </Typography>
        </Paper>
      )}
    </Fragment>
  );
}

export default withStyles(styles)(MeasurementsForm);
