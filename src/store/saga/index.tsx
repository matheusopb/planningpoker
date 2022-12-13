import { all, takeLatest } from 'redux-saga/effects';
import { RoomsTypes } from '../ducks/rooms/types';
import { getRooms, getRoomsAsync, addDocument, rmDocument } from './rooms';
import { RoomTypes } from '../ducks/room/types';
import { getRoom, getUsers } from './room';
import { UserTypes } from '../ducks/user/types';
import { getUser, getUserAsync, setDocument } from './user';

import { SagaIterator } from '@redux-saga/types';
import { AuthTypes } from '../ducks/auth/types';
import { loginFb, loginOutFb, loginWithCredential } from './auth';

export default function* rootSaga(): any {
    return yield all([
        //Auth sagas
        takeLatest(AuthTypes.LOAD_REQUEST, loginFb),
        takeLatest(AuthTypes.LOAD_LOGOFF, loginOutFb),
        takeLatest(AuthTypes.LOAD_REQUEST_CREDENTIAL, loginWithCredential),

        //Users sagas
        takeLatest(UserTypes.SYNC_DATA, getUserAsync),

        takeLatest(UserTypes.LOAD_REQUEST, getUser),
        takeLatest(UserTypes.LOAD_ADD, setDocument),

        //Loading async when login
        takeLatest(AuthTypes.LOAD_SUCCESS, getRoomsAsync),

        //Rooms sagas
        takeLatest(RoomsTypes.LOAD_REQUEST, getRooms),
        takeLatest(RoomsTypes.ADD_DOCUMENT, addDocument),
        takeLatest(RoomsTypes.SYNC_DATA, getRoomsAsync),
        takeLatest(RoomsTypes.RM_DOCUMENT, rmDocument),

        //Rooms sagas
        takeLatest(RoomTypes.SYNC_DATA, getRoom),
        takeLatest(RoomTypes.SYNC_USERS_DATA, getUsers),

    ])
}