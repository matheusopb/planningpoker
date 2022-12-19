//Libs
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { SagaIterator } from "redux-saga"

//Envs
import { rsf, db } from '../../settings/env'

//Types
import { Vote } from '../ducks/vote/types';

//Actions
import { syncSuccess, syncError, addError, addSuccess, rmError, rmSuccess, editSuccess, editError } from "../ducks/vote/actions";


export function* getVotes({ payload }: any): SagaIterator {
    try {
        let task: any = yield fork(rsf.firestore.syncCollection, db.collection('votes')
            .where('roomId', '==', payload.roomId)
            .where('round', '==', payload.round), {
            successActionCreator: syncSuccess,
            transform: votesTransformer,
            failureActionCreator: syncError
        })
        yield take('@member/SYNC_STOP')
        yield cancel(task)
    } catch (error) {
        yield put(syncError());
    }
}

export const votesTransformer = (votes: any) => {
    const res: Vote[] = []
    votes.forEach((doc: any) => {
        res.push({
            id: doc.id,
            ...doc.data(),
        })
    })
    return res
}

export function* addVote({ payload }: any): SagaIterator {
    try {
        yield call(rsf.firestore.addDocument,
            `votes`,
            payload);
        yield put(addSuccess())
    } catch (error) {
        yield put(addError())
    }
}


export function* editVote({ payload }: any): SagaIterator {
    try {
        yield call(rsf.firestore.setDocument,
            `votes/${payload?.id}`,
            payload,
            false);
        yield put(editSuccess())
    } catch (error) {
        yield put(editError())
    }
}

export function* rmVote({ payload }: any) {
    try {
        yield call(rsf.firestore.deleteDocument, `votes/${payload}`);
        yield put(rmSuccess())
    } catch (error) {
        yield put(rmError())
    }
}