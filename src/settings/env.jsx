
import { createFirestoreInstance } from "redux-firestore";
import store from '../store';

import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const firebaseConfig = {
  apiKey: "AIzaSyDAHm90kpj_GEX1Oh69JicM_koN-chARx8",
  authDomain: "planningpoker-7b96e.firebaseapp.com",
  projectId: "planningpoker-7b96e",
  storageBucket: "planningpoker-7b96e.appspot.com",
  messagingSenderId: "788451711448",
  appId: "1:788451711448:web:7553f054b1df57d93ebaad"
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {rrfProps, firebaseConfig, auth, provider }