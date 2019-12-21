import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDS-uQR61kp5AIkpxNrKifKvXumKjg1VAQ",
  authDomain: "e-commerce-app-b5cc0.firebaseapp.com",
  databaseURL: "https://e-commerce-app-b5cc0.firebaseio.com",
  projectId: "e-commerce-app-b5cc0",
  storageBucket: "e-commerce-app-b5cc0.appspot.com",
  messagingSenderId: "697495953009",
  appId: "1:697495953009:web:89ecd756ce02925810c5d0",
  measurementId: "G-2412V1CKTN"
};

export const createUserProfileDocument = async( user, data ) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...data
      });
    } catch(err) {
      console.log(err)
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
