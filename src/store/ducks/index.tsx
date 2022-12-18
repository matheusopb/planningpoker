import { combineReducers } from 'redux';
import roomsReducer from './rooms';
import roomReducer from './room';
import userReducer from './user';
import authReducer from './auth';
import memberReducer from './member';

export default combineReducers({
    roomsReducer,
    authReducer,
    roomReducer,
    userReducer,
    memberReducer,
});