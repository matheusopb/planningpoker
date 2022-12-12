import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import { loadFailure, loadSuccess, syncStop, syncSuccess } from "../ducks/rooms/actions"
import { SagaIterator } from "redux-saga"
import rsf from '../../settings/env'

export function* getRooms(): SagaIterator {
    try {
        console.log('sagas getRooms')
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
    console.log('sagas getRoomsAsync')

    let task: any = yield fork(rsf.firestore.syncCollection, 'rooms', {
        successActionCreator: syncSuccess,
        transform: roomsTransformer,
        failureActionCreator: syncStop

    })
    yield take('@rooms/SYNC_STOP')
    yield cancel(task)
}


