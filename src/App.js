import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Estimator from './Estimator';
import CreateEstimateForm from './CreateEstimateForm';
import NavBar from './NavBar';
import Estimate from './Estimate';
import estimateReducer from './reducers/estimate.reducer';
import useLocalStorageReducer from './hooks/useLocalStorageReducer';

function App() {
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

  return (
    <Route path="/">
      <NavBar />
      <Switch>
        <Route exact path="/create">
          <CreateEstimateForm
            estimates={estimates}
            dispatch={(props) => dispatch(props)}
          />
          ;
        </Route>

        <Route exact path="/">
          <Estimator estimates={estimates} />
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
  );
}

export default App;
