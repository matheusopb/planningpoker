import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { loadFailure, loadSucces } from "../ducks/rooms/actions"
import { SagaIterator } from '@redux-saga/types';

export function* getRooms(): SagaIterator {
    try {
        console.log('rodei')
        const response = yield call(api.get, '/users/matheusopb/repos')
        console.log('response', response.data)
        yield put(loadSucces(response.data))

    } catch (error) {
        yield put(loadFailure())
    }
}