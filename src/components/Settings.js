import React from 'react';
import { useFormik } from 'formik';
import validationSettingsSchema from './validation/validationSettingsSchema';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from './styles/settingsStyles';

function Settings(props) {
  const { settings, classes, edit } = props;

  const formik = useFormik({
    initialValues: {
      name: settings.name || '',
      email: settings.email || '',
      sqfPrice: settings.sqfPrice || '',
      hourly: settings.hourly || '',
    },
    validationSchema: validationSettingsSchema,
    onSubmit: (values) => {
      edit({
        name: values.name,
        sqfPrice: values.sqfPrice,
        hourly: values.hourly,
      });
    },
  });

  return (
    <Paper className={classes.paper}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Typography align="center" variant="h6">
                Your Information
              </Typography>
            </Paper>
          </Grid>
          <Divider />
          <Grid className={classes.textField} item xs={10} sm={5}>
            <TextField
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              label="Name"
              name="name"
              size="small"
              variant="outlined"
              error={
                formik.touched.name && Boolean(formik.errors.name)
              }
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid className={classes.textField} item xs={10} sm={5}>
            <TextField
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              name="email"
              size="small"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography align="center" variant="h6">
                Default Prices
              </Typography>
            </Paper>
          </Grid>
          <Grid className={classes.textField} item xs={10} sm={5}>
            <TextField
              fullWidth
              value={formik.values.sqfPrice}
              onChange={formik.handleChange}
              label="Sqf Price"
              name="sqfPrice"
              size="small"
              type="number"
              variant="outlined"
              error={
                formik.touched.sqfPrice && Boolean(formik.errors.sqfPrice)
              }
              helperText={formik.touched.sqfPrice && formik.errors.sqfPrice}
            />
          </Grid>
          <Grid className={classes.textField} item xs={10} sm={5}>
            <TextField
              fullWidth
              value={formik.values.hourly}
              onChange={formik.handleChange}
              label="Hourly Rate"
              name="hourly"
              size="small"
              type="number"
              variant="outlined"
              error={
                formik.touched.hourly && Boolean(formik.errors.hourly)
              }
              helperText={formik.touched.hourly && formik.errors.hourly}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default withStyles(styles)(Settings);
