import React from 'react';
import { useFormik } from 'formik';
import validationMeasureSchema from '../validation/validationMeasureSchema';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function EditMeasureForm(props) {
  const { dispatch, toggleEditForm, estimate, measure, index } = props;

  const formik = useFormik({
    initialValues: {
      roomLength: measure.roomLength,
      roomWidth: measure.roomWidth,
      sqfPrice: measure.sqfPrice,
    },
    validationSchema: validationMeasureSchema,
    onSubmit: (values) => {
      dispatch({
        type: 'EDITMEASURE',
        id: estimate.id,
        index: index,
        measures: {
          roomLength: values.roomLength,
          roomWidth: values.roomWidth,
          sqfPrice: values.sqfPrice,
        },
      });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            autoFocus
            variant="outlined"
            required
            value={formik.values.roomLength}
            onChange={formik.handleChange}
            margin="normal"
            label="Length"
            name="roomLength"
            error={formik.touched.roomLength && Boolean(formik.errors.roomLength)}
            helperText={formik.touched.roomLength && formik.errors.roomLength}
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
            error={formik.touched.roomWidth && Boolean(formik.errors.roomWidth)}
            helperText={formik.touched.roomWidth && formik.errors.roomWidth}
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
            error={formik.touched.sqfPrice && Boolean(formik.errors.sqfPrice)}
            helperText={formik.touched.sqfPrice && formik.errors.sqfPrice}
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
            type="submit"
            fullWidth
            size="small"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditMeasureForm;
