import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Estimator from './components/Estimator';
import CreateEstimateForm from './components/CreateEstimateForm';
import NavBar from './components/NavBar';
import Estimate from './components/Estimate';
import Welcome from './components/Welcome';
import estimateReducer from './reducers/estimate.reducer';
import useLocalStorageReducer from './hooks/useLocalStorageReducer';
import { useSession } from './store/Session';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function App() {
  const { isLoggedIn, isLoading } = useSession();
  const [estimates, dispatch] = useLocalStorageReducer(
    'estimates',
    [],
    estimateReducer
  );

  function findEstimate(id) {
    return estimates.find(function (estimate) {
      return estimate.id === id;
    });
  }

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
        <Route path="/">
          <NavBar isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/create">
              <CreateEstimateForm
                estimates={estimates}
                dispatch={(props) => dispatch(props)}
              />
              ;
            </Route>

            <Route exact path="/">
              <Estimator
                estimates={estimates}
                dispatch={(props) => dispatch(props)}
              />
            </Route>

            <Route
              exact
              path="/estimate/:id"
              render={(routeProps) => (
                <Estimate
                  estimate={findEstimate(routeProps.match.params.id)}
                  dispatch={(props) => dispatch(props)}
                />
              )}
            />
          </Switch>
        </Route>
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
