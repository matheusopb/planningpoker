import { UserState, UserTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: UserState = {
    user: undefined,
    error: false,
    loading: false,
    staticLoading: false,
    staticUser: undefined,
}

const reducer: Reducer<UserState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case UserTypes.SYNC_DATA:
            return { ...state, loading: true, error: true, user: undefined };
        case UserTypes.SYNC_SUCCESS:
            return { ...state, loading: false, error: false, user: action.payload };
        case UserTypes.SYNC_STOP:
            return { ...state, loading: false, error: true, user: undefined };

        case UserTypes.LOAD_REQUEST:
            return { ...state, staticLoading: true, error: false };
        case UserTypes.LOAD_FAILURE:
            return { ...state, staticLoading: false, error: false };
        case UserTypes.LOAD_SUCCESS:
            return { ...state, staticLoading: false, error: true, staticUser: action.payload };

        case UserTypes.LOAD_ADD:
            return { ...state, staticLoading: true };
        case UserTypes.LOAD_EDIT:
            return { ...state, staticLoading: true };
        default:
            return state;
    }
}

export default reducer