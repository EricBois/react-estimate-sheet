import React from 'react';
import { useFormik } from 'formik';
import validationMaterialSchema from '../validation/validationMaterialSchema';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function EditMaterialForm(props) {
  const { material, index, dispatch, estimate, toggleEditForm } = props;

  const formik = useFormik({
    initialValues: {
      item: material.item,
      quantity: material.quantity,
      price: material.price,
    },
    validationSchema: validationMaterialSchema,
    onSubmit: (values) => {
      dispatch({
        type: 'EDITMATERIAL',
        id: estimate.id,
        index: index,
        material: {
          item: values.item,
          quantity: values.quantity,
          price: values.price,
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            required
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
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            size="small"
          >
            EDIT
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditMaterialForm;
