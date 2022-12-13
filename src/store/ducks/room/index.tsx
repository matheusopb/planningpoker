import { RoomState, RoomTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: RoomState = {
    room: undefined,
    users: [],
    votes: [],
    error: false,
    loading: false
}

const reducer: Reducer<RoomState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case RoomTypes.SYNC_DATA:
            return { ...state, loading: true, error: true, room: undefined };
        case RoomTypes.SYNC_SUCCESS:
            return { ...state, loading: false, error: false, room: action.payload };
        case RoomTypes.SYNC_STOP:
            return { ...state, loading: false, error: true, room: undefined };

        case RoomTypes.SYNC_USERS_DATA:
            return { ...state, loading: true, error: false, users: [] };
        case RoomTypes.SYNC_USERS_SUCCESS:
            return { ...state, loading: false, error: false, users: action.payload };
        case RoomTypes.SYNC_USERS_STOP:
            return { ...state, loading: false, error: true, users: [] };
        case RoomTypes.SYNC_USERS_ADD:
            return { ...state };
        case RoomTypes.SYNC_USERS_EDIT:
            return { ...state };

        case RoomTypes.SYNC_VOTES_DATA:
            return { ...state, loading: true, error: false, votes: [] };
        case RoomTypes.SYNC_VOTES_SUCCESS:
            return { ...state, loading: false, error: false, votes: action.payload };
        case RoomTypes.SYNC_VOTES_STOP:
            return { ...state, loading: false, error: true, votes: [] };
        default:
            return state;
    }
}

export default reducer