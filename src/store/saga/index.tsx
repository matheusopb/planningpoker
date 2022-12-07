import { all, takeLatest } from 'redux-saga/effects';
import { RoomsTypes } from '../ducks/rooms/types';
import { getRooms } from './rooms';
import { SagaIterator } from '@redux-saga/types';

export default function* rootSaga(): SagaIterator {
    return yield all([
        takeLatest(RoomsTypes.LOAD_REQUEST, getRooms),
    ])
}