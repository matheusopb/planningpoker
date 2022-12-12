import { combineReducers } from 'redux';
import roomsReducer from './rooms';
import authReducer from './auth';

export default combineReducers({
    roomsReducer,
    authReducer,
});