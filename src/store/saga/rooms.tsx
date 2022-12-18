//Libs
import { cancel, fork, take } from 'redux-saga/effects';
import { SagaIterator } from "redux-saga"

//Envs
import { rsf } from '../../settings/env'

//Actions
import { syncSuccess, syncError } from "../ducks/rooms/actions"

export function* getRooms(): SagaIterator {
    let task: any = yield fork(rsf.firestore.syncCollection, 'rooms', {
        successActionCreator: syncSuccess,
        transform: roomsTransformer,
        failureActionCreator: syncError
    })
    yield take('@rooms/SYNC_STOP')
    yield cancel(task)
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





