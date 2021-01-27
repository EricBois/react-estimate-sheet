import React, { useState } from 'react';
import firebase from '../firebase';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function SignIn(props) {
  const [error, setError] = useState(null);
  const { toggle } = props;

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)
    ) {
      errors.email = 'Invalid Email Address';
    }

    if (!values.password) {
      errors.password = 'Password is Required';
    } else if (values.password.length <= 6) {
      errors.password = 'Must be more than 6 characters';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      firebase
        .login(values.email, values.password)
        .then(setError(null), resetForm({ values: '' }))
        .catch((err) => {
          setError('Email or Password Invalid');
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
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
            />
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
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
