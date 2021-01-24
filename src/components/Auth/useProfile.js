import { useState, useEffect } from 'react';
import firebase from '../../firebase/index';

function useProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        firebase.db
          .collection('users')
          .doc(user.uid)
          .get()
          .then((user) => {
            setProfile(user.data());
          });
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return profile;
}

export default useProfile;
