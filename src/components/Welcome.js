import React from 'react';
import useToggleState from './hooks/useToggleState';
import SignIn from './SignIn';
import Signup from './SignUp';
import Grid from '@material-ui/core/Grid';

export default function Welcome() {
  const [isNew, toggle] = useToggleState(false);
  return (
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '60vh' }}
>
      { !isNew ?
        <SignIn toggle={() => toggle}/> :
        <Signup toggle={() => toggle}/>
      }
      
      
    </Grid>
  )
}
