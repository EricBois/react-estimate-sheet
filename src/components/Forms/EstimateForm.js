import React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import validationEstimateSchema from '../validation/validationEstimateSchema';

import { withStyles } from '@material-ui/styles';
import styles from '../../styles/createEstimateStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

function EstimateForm(props) {
  const { classes, mode, saveToDb, estimate, toggleEditForm } = props;

  const history = useHistory();
  const id = uuid();

  const formik = useFormik({
    initialValues: {
      name: estimate.name,
      address: estimate.address,
      note: estimate.note,
    },
    validationSchema: validationEstimateSchema,
    onSubmit: (values) => {
      saveToDb(
        id,
        values.name,
        values.address,
        values.note,
      );
      !toggleEditForm ? history.push(`/estimate/${id}`) : toggleEditForm();
    },
  });

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography className={classes.title} variant="h5">
        Client Info
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formik.values.name}
              onChange={formik.handleChange}
              margin="normal"
              label="Client Name"
              name="name"
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formik.values.address}
              onChange={formik.handleChange}
              margin="normal"
              label="Address"
              name="address"
              fullWidth
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              value={formik.values.note}
              onChange={formik.handleChange}
              className={classes.textArea}
              name="note"
              aria-label="minimum height"
              rowsMin={5}
              placeholder="*OPTIONAL, Describe work / project"
            />
          </Grid>
          {!toggleEditForm ? (
            <Button type="submit">{mode}</Button>
          ) : (
            <>
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
                >
                  {mode}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Paper>
  );
}

export default withStyles(styles)(EstimateForm);
