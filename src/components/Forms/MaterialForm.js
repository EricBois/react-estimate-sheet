import React, { Fragment, useEffect, useContext } from 'react';
import MaterialList from '../MaterialList';
import FirebaseContext from '../../firebase/context';
import { withStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import validationMaterialSchema from '../validation/validationMaterialSchema';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import styles from '../styles/measurementsStyles';

function MaterialForm(props) {
  const { classes, dispatch, estimate } = props;
  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      item: '',
      quantity: '',
      price: '',
    },
    validationSchema: validationMaterialSchema,
    onSubmit: (values) => {
      dispatch({
        type: 'ADDMATERIAL',
        id: estimate.id,
        material: {
          item: values.item,
          quantity: values.quantity,
          price: values.price,
        },
      });
    },
  });

  useEffect(() => {
    const ac = new AbortController();
    // sync material with db
    const editEstimate = async () => {
      return await firebase.db
        .collection('estimates')
        .doc(estimate.id.toString())
        .update({
          material: estimate.material,
        });
    };
    editEstimate();
    
    return () => {
      ac.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimate.material]);

  let totalMats = () => {
    let total = 0;
    estimate.material.map((x) => (total += x.quantity * x.price));
    return total;
  };
  return (
    <Fragment>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Material
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
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
                value={formik.values.quantity}
                required
                onChange={formik.handleChange}
                margin="normal"
                type="number"
                label="Quantity"
                name="quantity"
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={formik.values.price}
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
      {estimate && estimate.material && (
        <List dense>
          {estimate.material.map((material, index) => (
            <Fragment key={index}>
              <MaterialList
                material={material}
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
          Total: ${totalMats().toFixed(2)}
        </Typography>
      </Paper>
    </Fragment>
  );
}

export default withStyles(styles)(MaterialForm);
