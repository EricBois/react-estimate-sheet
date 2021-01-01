import React from 'react';
import { useAuth } from '../store/Auth';
import useInputState from '../hooks/useInputState';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function SignIn(props) {
  const { signin } = useAuth();
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const { toggle } = props;

  function handleSignin() {
    signin(email, password);
  }

  return (
    <Paper style={{minHeight: '100vh', maxWidth: '400px', margin: 'auto'}}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignin();
        }}
      >
        <Grid container  spacing={2}>
          <Grid item style={{ margin: 'auto' }} xs={10}>
            <Typography align="center" variant="h3">
              Sign In
            </Typography>
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <TextField
              fullWidth
              value={email}
              onChange={setEmail}
              label="Email"
              name="email"
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
            <TextField
              fullWidth
              value={password}
              onChange={setPassword}
              label="Password"
              name="password"
              size="small"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid style={{ margin: 'auto' }} item xs={10}>
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
            <Button fullWidth onClick={toggle(true)}>Or Create an Account</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default SignIn;
