import React, { useState } from 'react';
import { useFormik } from 'formik';
import validationSchema from './validation/validationSchema';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase';

function SignUp(props) {
  const [error, setError] = useState(null);
  const { toggle } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      firebase
        .register(values.name, values.email, values.password)
        .then(setError(null), resetForm({ values: '' }))
        .catch((err) => {
          setError('Something Went Wrong!');
        });
      resetForm({ values: '' });
    },
  });

  return (
    <Paper style={{ minHeight: '100vh', maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item style={{ margin: 'auto' }} xs={10}>
            <Typography align="center" variant="h3">
              Sign Up
            </Typography>
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <TextField
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              label="Name"
              name="name"
              size="small"
              variant="outlined"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <TextField
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              name="email"
              size="small"
              variant="outlined"
              autoComplete="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <TextField
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
              name="password"
              size="small"
              type="password"
              variant="outlined"
              autoComplete="new-password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <TextField
              fullWidth
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              label="Confirm Password"
              name="confirmPassword"
              size="small"
              type="password"
              variant="outlined"
              autoComplete="new-password"
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            {error ? (
              <p style={{ color: 'red', margin: 'auto', textAlign: 'center' }}>
                {error}
              </p>
            ) : null}
            <Button
              color="secondary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <Button fullWidth onClick={toggle(false)}>
              Already have an Account ?
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default SignUp;
