import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import { addData, syncData, syncStop, syncSuccess, loadFailure, loadSuccess } from "../ducks/user/actions"
import { SagaIterator } from "redux-saga"
import rsf from '../../settings/env'
import { User } from '../ducks/user/types';


export function* setDocument({ payload }: any): any {
    try {
        let id = payload.id
        let user = payload
        delete user.id
        yield call(
            rsf.firestore.setDocument,
            `users/${id}`,
            { ...user },
            true
        );
    } catch (error) {
    }
}

export function* rmDocument({ payload }: any) {
    try {
        yield call(rsf.firestore.deleteDocument, `rooms/${payload}`);
    } catch (error) {
    }
}

export const userTransformer = (user: any) => {
    console.log('user', user)
    return {
        id: user.id,
        ...user.data(),
    }
}

export function* getUserAsync({ payload }: any): SagaIterator {
    let task: any = yield fork(rsf.firestore.syncDocument, `users/${payload}`, {
        successActionCreator: syncSuccess,
        transform: userTransformer,
        failureActionCreator: syncStop
    })
    yield take('@user/SYNC_STOP')
    yield cancel(task)
}


export function* getUser({ payload }: any): SagaIterator {
    try {
        console.log('sagas getUser', payload)
        const snapshot = yield call(rsf.firestore.getDocument, `users/${payload}`);
        let user: User | undefined = snapshot.data()

        yield put(loadSuccess(user));
    } catch (error) {
        console.log('error', error)
        yield put(loadFailure());
    }
}


