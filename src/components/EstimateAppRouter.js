import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import firebase from '../firebase/index';
import { useSettings } from './hooks/useSettings';
import Estimator from './EstimateList';
import EstimateForm from './Forms/EstimateForm';
import Settings from './Settings';
import NavBar from './NavBar';
import Estimate from './EstimateSheet';
import Action from './Action';
import estimateReducer from '../reducers/estimate.reducer';
import ValidateEmailPage from './ValidateEmailPage';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';

function EstimateApp(props) {
  const { user } = props;
  const [estimates, dispatch] = useReducer(estimateReducer, []);
  const estimate = { name: '', address: '', note: '' };
  const { editSettings, settings } = useSettings();
  const desktop = useMediaQuery('(min-width:650px)');

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

  const [value, setValue] = useState(0);

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
        <BottomNavigation
          style={{
            width: desktop ? '650px' : '100%',
            position: 'fixed',
            bottom: 0,
            margin: '0.3% auto', /* Will not center vertically and won't work in IE6/7. */
            left: 0,
            right: 0
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Estimates" component={Link}
            to="/" icon={<DescriptionIcon />} />
          <BottomNavigationAction component={Link}
            to="/create" label="Create" icon={<AddCircleIcon />} />
          <BottomNavigationAction component={Link}
            to="/settings" label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Route>
    </Fragment>
  );
}

export default EstimateApp;
