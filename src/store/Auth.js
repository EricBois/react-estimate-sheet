import { database, auth } from "../firebase";
import Store from "./";

export function useAuth() {
  const [, setState] = Store.useStore();

  const getUserFromDB = async userID => {
    const db = await database;
    return db
      .collection("users")
      .doc(userID)
      .get()
      .then(user => {
        return user.data();
      });
  };

  const saveUserToDB = async (user, name) => {
    const db = await database;
    return db
      .collection("users")
      .doc(user.uid.toString())
      .set({
        id: user.uid.toString(),
        name,
        email: user.email
      })
      .then(() => {
        setState({
          currentUser: {
            id: user.uid.toString(),
            name,
            email: user.email
          },
          isLoggedIn: true
        });
      });
  };

  const signup = (email, password, userName) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // We want to save the user to our own collection with custom attributes for us
        saveUserToDB(response.user, userName);
        return response.user;
      });
  };

  const signin = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async response => {
        const user = await getUserFromDB(response.user.uid);
        setState({
          currentUser: user,
          isLoggedIn: true
        });
        return response.user;
      });
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setState({
        currentUser: null,
        isLoggedIn: false
      });
    });
  };

  return {
    signup,
    signout,
    signin
  };
}
