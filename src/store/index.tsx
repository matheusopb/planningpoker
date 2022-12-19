//Libs
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

//Roots
import rootReducer from './ducks';
import rootSaga from './saga';

//Types
import { AuthState } from './ducks/auth/types';
import { RoomState } from './ducks/room/types';
import { UserState } from './ducks/user/types';
import { MemberState } from './ducks/member/types';
import { VoteState } from './ducks/vote/types';
import { RoomsState } from './ducks/rooms/types';

export interface ApplicationState {
    roomsReducer: RoomsState,
    roomReducer: RoomState,
    authReducer: AuthState,
    userReducer: UserState,
    memberReducer: MemberState,
    voteReducer: VoteState
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;