import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Estimator from './Estimator';
import CreateEstimateForm from './CreateEstimateForm';
import NavBar from './NavBar';

function App() {
  return (
      <Route path="/">
        <NavBar />
      <Switch>
        <Route path="/create">
          <CreateEstimateForm />
        </Route>
        <Route path="/">
          <Estimator />
        </Route>
      </Switch>
      </Route>
  );
}

export default App;
