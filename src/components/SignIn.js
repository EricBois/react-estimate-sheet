import React, { useState } from 'react';
import firebase from '../firebase';
import { useFormik } from 'formik';
import validationLoginSchema from './validation/validationLoginSchema';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function SignIn(props) {
  const [error, setError] = useState(null);
  const { toggle } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationLoginSchema,
    onSubmit: (values, { resetForm }) => {
      firebase
        .login(values.email, values.password)
        .then(setError(null), resetForm({ values: '' }))
        .catch((err) => {
          switch(err.code) {
            case 'auth/network-request-failed':
              setError('No Internet Connection Detected!');
              break;
            case 'auth/user-not-found':
              setError('Email or Password Invalid');
              break;
            default:
              setError('Something went wrong!');
              break;
          }
        });
    },
  });

  return (
    <Paper style={{ minHeight: '100vh', maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item style={{ margin: 'auto' }} xs={10}>
            <Typography align="center" variant="h3">
              Sign In
            </Typography>
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <TextField
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              name="email"
              size="small"
              required
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
              required
              label="Password"
              name="password"
              size="small"
              type="password"
              variant="outlined"
              autoComplete="current-password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
              Log in
            </Button>
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <Button fullWidth onClick={toggle(true)}>
              Or Create an Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default SignIn;
