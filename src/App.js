import React, { Fragment, useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter } from 'react-router-dom';
import EstimateApp from './components/EstimateAppRouter';
import Welcome from './components/Welcome';
import Loader from './components/Loader';
import useAuth from './components/Auth/useAuth';
import {useSettings} from './components/hooks/useSettings';
import firebase, { FirebaseContext } from './firebase/index';

function App() {
  const user = useAuth();
  const {settings} = useSettings();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <React.StrictMode>
      <FirebaseContext.Provider value={{ user, firebase, settings }}>
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
