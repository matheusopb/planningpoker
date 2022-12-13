import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import { loadFailure, loadSuccess, syncStop, syncSuccess } from "../ducks/rooms/actions"
import { SagaIterator } from "redux-saga"
import rsf from '../../settings/env'
import { PartialRoom, Room } from '../ducks/rooms/types';
import { UserState } from '../ducks/user/types';
import { getUser } from './functions';

export function* getRooms(): SagaIterator {
    try {
        const snapshot = yield call(rsf.firestore.getCollection, 'rooms');
        let rooms: any = []
        snapshot.forEach((room: any) => {
            rooms.push({
                id: room.id,
                ...room.data()
            })
        });
        yield put(loadSuccess(rooms));
    } catch (error) {
        yield put(loadFailure());
    }
}

export function* addDocument({ payload }: any): SagaIterator {
    try {
        const { id } = yield call(rsf.firestore.addDocument, 'rooms', payload);
        let { user }: UserState = yield select(getUser);
        yield call(rsf.firestore.setDocument,
            `rooms/${id}/users/${user?.id}`,
            {
                type: 'admin',
                reference: (rsf.firestore.getDocument, `users/${user?.id}`)
            },
            false);
        yield call(rsf.firestore.setDocument,
            `users/${user?.id}/rooms/${id}`,
            {
                type: 'admin',
                reference: (rsf.firestore.getDocument, `rooms/${id}`)
            },
            false);

    } catch (error) {

    }
}


export function* rmDocument({ payload }: any) {
    try {
        yield call(rsf.firestore.deleteDocument, `rooms/${payload}`);
    } catch (error) {
        // yield put(loadFailure());
    }
}


// function* addDocument() {
//     const doc = yield call(
//         rsf.firestore.addDocument,
//         'users',
//         {
//             firstName: 'Elon',
//             lastName: 'Musk'
//         }
//     );
// }

export const roomsTransformer = (rooms: any) => {

    const res: any = []
    rooms.forEach((doc: any) =>
        res.push({
            id: doc.id,
            ...doc.data(),
        }),
    )
    return res
}


export function* getRoomsAsync(): SagaIterator {

    let task: any = yield fork(rsf.firestore.syncCollection, 'rooms', {
        successActionCreator: syncSuccess,
        transform: roomsTransformer,
        failureActionCreator: syncStop

    })
    yield take('@rooms/SYNC_STOP')
    yield cancel(task)
}


