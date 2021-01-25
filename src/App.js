import React, { Fragment, useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter } from 'react-router-dom';
import EstimateApp from './components/EstimateApp';
import Welcome from './components/Welcome';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import useAuth from './components/Auth/useAuth';
import useProfile from './components/Auth/useProfile';
import firebase, { FirebaseContext } from './firebase/index';

function App() {
  const user = useAuth();
  const profile = useProfile();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <Grid
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        container
      >
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <React.StrictMode>
      <FirebaseContext.Provider value={{ user, firebase, profile }}>
        <BrowserRouter>
          {user ? (
            <EstimateApp user={user} />
          ) : (
            <Fragment>
              <NavBar isLoggedIn={user} />
              <Welcome />
            </Fragment>
          )}
        </BrowserRouter>
      </FirebaseContext.Provider>
    </React.StrictMode>
  );
}

export default App;
