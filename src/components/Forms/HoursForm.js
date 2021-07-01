import React, { Fragment, useEffect, useContext } from 'react';
import FirebaseContext from '../../firebase/context';
import { withStyles } from '@material-ui/styles';
import HoursList from '../HoursList';
import { useFormik } from 'formik';
import validationHoursSchema from '../validation/validationHoursSchema';

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
  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      item: '',
      hours: '',
      price: '',
    },
    validationSchema: validationHoursSchema,
    onSubmit: (values) => {
      dispatch({
        type: 'ADDHOURS',
        id: estimate.id,
        hours: { item: values.item, hours: values.hours, price: values.price },
      });
    },
  });

  let totalHours = () => {
    let total = 0;
    estimate.hours.map((x) => (total += x.hours * x.price));
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
          hours: estimate.hours,
        });
    };
    editEstimate();
    
    return () => {
      ac.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimate.hours]);

  return (
    <Fragment>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Hours
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                className={classes.textfield}
                value={formik.values.item}
                onChange={formik.handleChange}
                margin="normal"
                label="Item Name"
                name="item"
                error={formik.touched.item && Boolean(formik.errors.item)}
                helperText={formik.touched.item && formik.errors.item}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={formik.values.hours}
                required
                onChange={formik.handleChange}
                margin="normal"
                type="number"
                label="Hours"
                name="hours"
                error={formik.touched.hours && Boolean(formik.errors.hours)}
                helperText={formik.touched.hours && formik.errors.hours}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={formik.values.price}
                required
                onChange={formik.handleChange}
                margin="normal"
                type="number"
                label="Price"
                name="price"
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
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
