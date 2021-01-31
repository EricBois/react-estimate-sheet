import React from 'react';
import { useFormik } from 'formik';
import validationMaterialSchema from './validation/validationMaterialSchema';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

function Settings(props) {
  const { settings } = props;

  const formik = useFormik({
    initialValues: {
      name: settings.name || '',
      email: settings.email || '',
    },
    validationSchema: validationMaterialSchema,
    onSubmit: (values) => {},
  });

  return (
    <Paper style={{ maxWidth: '800px', margin: 'auto' }}>
      <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <Typography align="center" variant="h3" component="h2">
              Settings
            </Typography>
          </Paper>
        </Grid>
        <Divider />
          <Grid style={{ margin: 'auto' }} item xs={10} sm={5}>
            <TextField
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              label="Name"
              name="name"
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10} sm={5}>
            <TextField
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              name="email"
              size="small"
              variant="outlined"
            />
          </Grid>
      </Grid>
      </form>
    </Paper>
  );
}

export default Settings;
