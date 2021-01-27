import React, { useState } from 'react';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase';

function SignUp(props) {
  const [error, setError] = useState(null);
  const { toggle } = props;

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is Required';
    }
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
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords does not match';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please Confirm Password';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
    validate,
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
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
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
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
            />
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
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
            />
            {formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
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
