import React, { Fragment, useEffect, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from '../firebase/index';
import {useSettings} from './hooks/useSettings';
import Estimator from './EstimateList';
import EstimateForm from './Forms/EstimateForm';
import Settings from './Settings';
import NavBar from './NavBar';
import Estimate from './EstimateSheet';
import Action from './Action';
import estimateReducer from '../reducers/estimate.reducer';
import ValidateEmailPage from './ValidateEmailPage';

function EstimateApp(props) {
  const { user } = props;
  const [estimates, dispatch] = useReducer(estimateReducer, []);
  const estimate = { name: '', address: '', note: '' };
  const {editSettings, settings} = useSettings();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.uid && estimates.length === 0) {
          await firebase.db
            .collection('estimates')
            .where('userId', '==', user.uid)
            .orderBy('date', 'desc')
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                dispatch({ type: 'ADD', ...doc.data() });
              });
            });
        }
      } catch (e) {
        //TODO implement errors
        console.log(e);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function findEstimate(id) {
    return estimates.find(function (estimate) {
      return estimate.id === id;
    });
  }

  const saveToDb = (id, name, address, note) => {
    dispatch({ type: 'ADD', id, name, address, note });
    firebase.save(id, { name, address, note }, user);
  };

  return (
    <Fragment>
      <Route path="/">
        <NavBar isLoggedIn={user} />
        {user.emailVerified ? (
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

            <Route exact path="/settings">
              <Settings settings={settings} edit={(props) => editSettings(props)} />
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
        ) : (
          <Switch>
            <Route exact path="/action">
              <Action />
            </Route>
            <Route exact path="/">
              <ValidateEmailPage />
            </Route>
          </Switch>
        )}
      </Route>
    </Fragment>
  );
}

export default EstimateApp;
