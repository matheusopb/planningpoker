import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { RoomsState } from './ducks/rooms/types';

import rootReducer from './ducks';
import rootSaga from './saga';
import { AuthState } from './ducks/auth/types';

export interface ApplicationState {
    roomsReducer: RoomsState,
    authReducer: AuthState

}



const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;