import { combineReducers } from 'redux';
import roomsReducer from './rooms';
import authReducer from './auth';

import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export default combineReducers({
    roomsReducer,
    authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});