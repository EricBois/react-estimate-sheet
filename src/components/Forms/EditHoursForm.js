import React from 'react';
import { useFormik } from 'formik';
import validationHoursSchema from '../validation/validationHoursSchema';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function EditHoursForm(props) {
  const { hour, toggleEditForm, index, dispatch, estimate } = props;

  const formik = useFormik({
    initialValues: {
      item: hour.item,
      hours: hour.hours,
      price: hour.price,
    },
    validationSchema: validationHoursSchema,
    onSubmit: (values) => {
      dispatch({
        type: 'EDITHOURS',
        id: estimate.id,
        index: index,
        hours: { item: values.item, hours: values.hours, price: values.price },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            name="item"
            variant="outlined"
            required
            value={formik.values.item}
            onChange={formik.handleChange}
            margin="normal"
            label="Item Name"
            error={formik.touched.item && Boolean(formik.errors.item)}
            helperText={formik.touched.item && formik.errors.item}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="hours"
            variant="outlined"
            value={formik.values.hours}
            required
            onChange={formik.handleChange}
            margin="normal"
            type="number"
            label="Hours"
            error={formik.touched.hours && Boolean(formik.errors.hours)}
            helperText={formik.touched.hours && formik.errors.hours}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="price"
            variant="outlined"
            value={formik.values.price}
            required
            onChange={formik.handleChange}
            margin="normal"
            type="number"
            label="Price"
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => toggleEditForm()}
          >
            CANCEL
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="contained" type="submit" fullWidth>
            EDIT
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default EditHoursForm;
