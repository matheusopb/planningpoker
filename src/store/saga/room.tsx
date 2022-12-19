//Libs
import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import { SagaIterator } from "redux-saga"

//Envs
import { rsf } from '../../settings/env'

//Types
import { UserState } from '../ducks/user/types';

//Actions
import { syncSuccess, syncError, addError, addSuccess, rmError, rmSuccess, editSuccess, editError } from "../ducks/room/actions"

//Redux
import { getUser } from './functions';

export function* getRoom({ payload }: any): SagaIterator {
    try {
        let task: any = yield fork(rsf.firestore.syncDocument, `rooms/${payload}`, {
            successActionCreator: syncSuccess,
            transform: roomTransformer,
            failureActionCreator: syncError
        })
        yield take('@room/SYNC_STOP')
        yield cancel(task)
    } catch (error) {
        yield put(syncError())
    }
}

export const roomTransformer = (room: any) => {
    return {
        id: room.id,
        ...room.data(),
    }
}

export function* addRoom({ payload }: any): SagaIterator {
    try {
        const { id } = yield call(rsf.firestore.addDocument, 'rooms', { name: payload });
        let { user }: UserState = yield select(getUser);
        yield call(rsf.firestore.addDocument,
            `members`,
            {
                userId: user?.id,
                roomId: id,
                type: 'admin',
                userData: user
            })
        yield put(addSuccess())
    } catch (error) {
        yield put(addError())
    }
}

export function* editRoom({ payload }: any): SagaIterator {
    try {
        console.log('editRoom: ')
        yield call(rsf.firestore.setDocument,
            `rooms/${payload?.id}`,
            payload,
            false);
        yield put(editSuccess())
    } catch (error) {
        yield put(editError())
    }
}

export function* rmRoom({ payload }: any) {
    try {
        yield call(rsf.firestore.deleteDocument, `rooms/${payload}`);
        yield put(rmSuccess())
    } catch (error) {
        yield put(rmError())
    }
}