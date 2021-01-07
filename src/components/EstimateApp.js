import React, { Fragment, useEffect, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import Estimator from './Estimator';
import EstimateForm from './forms/EstimateForm';
import useDb from '../store/Db';
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
  const { addEstimate } = useDb();
  const estimate = {name: '', address: '', note: ''}

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      try {
        if (currentUser.uid && estimates.length === 0) {
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
  }, [currentUser, estimates]);

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
  const saveToDb = (id, name, address, note) => {
    dispatch({ type: 'ADD', id, name, address, note });
    addEstimate(id, {name,address, note})
  }

  return (
    <Fragment>
      <Route path="/">
        <NavBar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/create">
            <EstimateForm
              estimate={estimate}
              mode="Create"
              saveToDb={saveToDb}
              toggleEditForm={false}
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
