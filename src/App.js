import React, { Fragment } from 'react';
import NavBar from './components/NavBar';
import EstimateApp from './components/EstimateApp';
import Welcome from './components/Welcome';
import { useSession } from './store/Session';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function App() {
  const { isLoggedIn, isLoading } = useSession();

  if (isLoading) {
    return (
      <Grid direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }} container>
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Fragment>
      {isLoggedIn ? (
        <EstimateApp />
      ) : (
        <Fragment>
          <NavBar isLoggedIn={isLoggedIn} />
          <Welcome />
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
