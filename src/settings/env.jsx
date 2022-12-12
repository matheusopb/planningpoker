// import firebase from 'firebase'
import '@firebase/firestore' // 👈 Don't forget this!
import ReduxSagaFirebase from 'redux-saga-firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDlzMYEF2PHGJ3JX2lFv05aJ2tJjyb6rN4",
  authDomain: "planningpoker2-12dff.firebaseapp.com",
  projectId: "planningpoker2-12dff",
  storageBucket: "planningpoker2-12dff.appspot.com",
  messagingSenderId: "76753588923",
  appId: "1:76753588923:web:1013bbee426a40234f8f9e"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

const rsf = new ReduxSagaFirebase(firebaseApp)

export default rsf
