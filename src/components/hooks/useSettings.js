import { useState, useEffect } from 'react';
import firebase from '../../firebase/index';

function useSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        firebase.db
          .collection('users')
          .doc(user.uid)
          .get()
          .then((user) => {
            setSettings(user.data());
          });
      } else {
        setSettings(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return settings;
}

export default useSettings;
