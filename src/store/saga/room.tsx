import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import { syncStop, syncSuccess, syncUsersData, syncUsersStop, syncUsersSuccess, } from "../ducks/room/actions"
import { SagaIterator } from "redux-saga"
import rsf from '../../settings/env'
import { User } from '../ducks/room/types';
import { UserState } from '../ducks/user/types';
import { getUser } from './functions';

export const roomTransformer = (room: any) => {
    return {
        id: room.id,
        ...room.data(),
    }
}

export function* getRoom({ payload }: any): SagaIterator {
    let task: any = yield fork(rsf.firestore.syncDocument, `rooms/${payload}`, {
        successActionCreator: syncSuccess,
        transform: roomTransformer,
        failureActionCreator: syncStop
    })
    yield take('@room/SYNC_STOP')
    yield cancel(task)
}

export const usersTransformer = (users: any) => {
    const res: User[] = []
    users.forEach((doc: any) => {
        res.push({
            id: doc.id,
            ...doc.data(),
        })
    })
    return res
}

export function* getUsers({ payload }: any): SagaIterator {
    try {
        let task: any = yield fork(rsf.firestore.syncCollection, `rooms/${payload}/users`, {
            successActionCreator: syncUsersSuccess,
            transform: usersTransformer,
            failureActionCreator: syncUsersStop
        })
        yield take('@room/users/SYNC_STOP')
        yield cancel(task)
    } catch (error) {
        yield put(syncUsersStop());
    }

}


export function* addNewUserToRoom({ payload }: any): SagaIterator {
    try {
        let { user }: UserState = yield select(getUser);
        yield call(rsf.firestore.setDocument,
            `rooms/${payload}/users/${user?.id}`,
            {
                type: 'request',
                reference: (rsf.firestore.getDocument, `users/${user?.id}`)
            },
            false);
        yield call(rsf.firestore.setDocument,
            `users/${user?.id}/rooms/${payload}`,
            {
                reference: (rsf.firestore.getDocument, `rooms/${payload}`)
            },
            false);
    } catch (error) {

    }
}




