import React, { Fragment } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import EstimateApp from "./components/EstimateAppRouter";
import Welcome from "./components/Welcome";
import Loader from "./components/Loader";
import useAuth from "./components/Auth/useAuth";
import { useSettings } from "./components/hooks/useSettings";
import firebase, { FirebaseContext } from "./firebase/index";

function App() {
  const { user, isLoading } = useAuth();
  const { settings } = useSettings();

  if (isLoading) {
    return <Loader />;
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
