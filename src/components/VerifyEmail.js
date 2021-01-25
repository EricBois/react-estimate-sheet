import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FirebaseContext from '../firebase/context';

function VerifyEmail(props) {
  const [error, setError] = useState('');
  const [validCode, setValidCode] = useState(null);
  const [verifiedCode, setVerifiedCode] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const { actionCode } = props;

  useEffect(() => {
    firebase.auth.applyActionCode(actionCode).then(
      () => {
        // Email address has been verified.
        setValidCode(true);
        setVerifiedCode(true);
        setTimeout(() => firebase.auth.signOut(), 4000);
      },
      (error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
        setError(error.message);
        setValidCode(false);
        setVerifiedCode(true);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let component;
  if (!verifiedCode) {
    component = <CircularProgress />;
  } else if (verifiedCode && validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Your email has been verified</h1>
        <p>You can now sign in with your new account</p>
      </div>
    );
  } else if (verifiedCode && !validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Try verifying your email again</h1>
        <p className="error">{error}</p>
      </div>
    );
  }

  return component;
}

export default VerifyEmail;
