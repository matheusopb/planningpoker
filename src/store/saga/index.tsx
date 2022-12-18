//libs
import { all, takeLatest } from 'redux-saga/effects';

//types
import { RoomsTypes } from '../ducks/rooms/types';
import { RoomTypes } from '../ducks/room/types';
import { UserTypes } from '../ducks/user/types';
import { AuthTypes } from '../ducks/auth/types';
import { MemberTypes } from '../ducks/member/types';

//Sagas
import { getRooms } from './rooms';
import { getRoom, addRoom, rmRoom } from './room';
import { getUser, getUserAsync, setDocument } from './user';
import { loginFb, loginOutFb, loginWithCredential } from './auth';
import { addMember, editMember, getMembers, rmMember } from './member';
import { editData } from '../ducks/member/actions';

export default function* rootSaga(): any {
    return yield all([
        //Auth sagas
        takeLatest(AuthTypes.LOAD_REQUEST, loginFb),
        takeLatest(AuthTypes.LOAD_LOGOFF, loginOutFb),
        takeLatest(AuthTypes.LOAD_REQUEST_CREDENTIAL, loginWithCredential),

        //SUCCESS AUTH
        takeLatest(AuthTypes.LOAD_SUCCESS, getRooms),

        //Users sagas
        takeLatest(UserTypes.SYNC_DATA, getUserAsync),
        takeLatest(UserTypes.LOAD_REQUEST, getUser),
        takeLatest(UserTypes.LOAD_ADD, setDocument),

        //Rooms sagas
        takeLatest(RoomsTypes.SYNC_DATA, getRooms),

        //Room sagas
        takeLatest(RoomTypes.SYNC_DATA, getRoom),
        takeLatest(RoomTypes.ADD_DATA, addRoom),
        takeLatest(RoomTypes.RM_DATA, rmRoom),


        //Member sagas
        takeLatest(MemberTypes.SYNC_DATA, getMembers),
        takeLatest(MemberTypes.ADD_DATA, addMember),
        takeLatest(MemberTypes.EDIT_DATA, editMember),
        takeLatest(MemberTypes.RM_DATA, rmMember),



    ])
}