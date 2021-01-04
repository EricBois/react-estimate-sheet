import React, { Fragment, useEffect, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import Estimator from './Estimator';
import CreateEstimateForm from './CreateEstimateForm';
import NavBar from './NavBar';
import Estimate from './Estimate';
import estimateReducer from '../reducers/estimate.reducer';
import { database } from '../firebase';
import { useSession } from '../store/Session';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function App() {
  const { isLoggedIn, isLoading, currentUser } = useSession();
  const [estimates, dispatch] = useReducer(estimateReducer, []);

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      try {
        if (currentUser.uid) {
          await database
            .collection('estimates')
            .where('userId', '==', currentUser.uid)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                dispatch({ type: 'ADD', ...doc.data() });
              });
            });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      ac.abort();
    };
  }, [currentUser]);

  function findEstimate(id) {
    return estimates.find(function (estimate) {
      return estimate.id === id;
    });
  }

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
    <Fragment>
      <Route path="/">
        <NavBar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/create">
            <CreateEstimateForm
              estimates={estimates}
              dispatch={(props) => dispatch(props)}
            />
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
    </Fragment>
  );
}

export default App;
