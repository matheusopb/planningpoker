import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { RoomsState } from './ducks/rooms/types';

import rootReducer from './ducks';
import rootSaga from './saga';

export interface ApplicationState {
    roomsReducer: RoomsState
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;