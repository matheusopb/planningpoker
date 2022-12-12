import { all, takeLatest } from 'redux-saga/effects';
import { RoomsTypes } from '../ducks/rooms/types';
import { getRooms, getRoomsAsync } from './rooms';
import { SagaIterator } from '@redux-saga/types';
import { AuthTypes } from '../ducks/auth/types';
import { loginFb, loginOutFb, loginWithCredential } from './auth';

export default function* rootSaga(): SagaIterator {
    return yield all([
        //Auth sagas
        takeLatest(AuthTypes.LOAD_REQUEST, loginFb),
        takeLatest(AuthTypes.LOAD_LOGOFF, loginOutFb),
        takeLatest(AuthTypes.LOAD_REQUEST_CREDENTIAL, loginWithCredential),

        //Loading async when login
        takeLatest(AuthTypes.LOAD_SUCCESS, getRoomsAsync),

        //Rooms sagas
        takeLatest(RoomsTypes.LOAD_REQUEST, getRooms),
        takeLatest(RoomsTypes.SYNC_DATA, getRoomsAsync)
    ])
}