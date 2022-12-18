//Libs
import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import { SagaIterator } from "redux-saga"

//Envs
import { rsf, db } from '../../settings/env'

//Types
import { UserState } from '../ducks/user/types';
import { Member } from '../ducks/member/types';

//Actions
import { syncSuccess, syncError, addError, addSuccess, rmError, rmSuccess, editSuccess, editError } from "../ducks/member/actions"

//Sagas
import { getUser } from './user';



export function* getMembers({ payload }: any): SagaIterator {
    try {
        let task: any = yield fork(rsf.firestore.syncCollection, db.collection('members').where('roomId', '==', payload), {
            successActionCreator: syncSuccess,
            transform: membersTransformer,
            failureActionCreator: syncError
        })
        yield take('@member/SYNC_STOP')
        yield cancel(task)
    } catch (error) {
        yield put(syncError());
    }
}

export const membersTransformer = (members: any) => {
    const res: Member[] = []
    members.forEach((doc: any) => {
        res.push({
            id: doc.id,
            ...doc.data(),
        })
    })
    return res
}

export function* addMember({ payload }: any): SagaIterator {
    try {
        yield call(rsf.firestore.addDocument,
            `members`,
            payload);
        yield put(addSuccess())
    } catch (error) {
        yield put(addError())
    }
}


export function* editMember({ payload }: any): SagaIterator {
    try {
        yield call(rsf.firestore.setDocument,
            `members/${payload?.id}`,
            payload,
            false);
        yield put(editSuccess())
    } catch (error) {
        yield put(editError())
    }
}

export function* rmMember({ payload }: any) {
    try {
        yield call(rsf.firestore.deleteDocument, `members/${payload}`);
        yield put(rmSuccess())
    } catch (error) {
        yield put(rmError())
    }
}