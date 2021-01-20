import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    app.firestore().enablePersistence({ synchronizeTabs: true })
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }

  // estimate FN
  async save(id, data, user) {
    await this.db
    .collection('estimates')
    .doc(id.toString())
    .set({
      id: id.toString(),
      date: new Date(),
      userId: user.uid.toString(),
      measures: [],
      hours: [],
      material: [],
      ...data,
    });
  }

  async edit(id, data) {
    await this.db
    .collection('estimates')
    .doc(id.toString())
    .update({
      ...data,
    });
  }

  async delete(id) {
    await this.db.collection('estimates').doc(id.toString()).delete();
  }
}


const firebase = new Firebase();
export default firebase;
