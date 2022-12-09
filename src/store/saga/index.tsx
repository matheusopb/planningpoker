import { all, takeLatest } from 'redux-saga/effects';
import { RoomsTypes } from '../ducks/rooms/types';
import { getRooms } from './rooms';
import { SagaIterator } from '@redux-saga/types';
import { AuthTypes } from '../ducks/auth/types';
import { loginFb, loginOutFb } from './auth';

export default function* rootSaga(): SagaIterator {
    return yield all([
        takeLatest(RoomsTypes.LOAD_REQUEST, getRooms),
        takeLatest(AuthTypes.LOAD_REQUEST, loginFb),
        takeLatest(AuthTypes.LOAD_REQUEST, loginOutFb),

    ])
}