import { AuthState, AuthTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: AuthState = {
    data: undefined,
    error: false,
    loading: false
}

const reducer: Reducer<AuthState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case AuthTypes.LOAD_REQUEST:
            return { ...state, loading: true };
        case AuthTypes.LOAD_REQUEST_CREDENTIAL:
            return { ...state, loading: true };
        case AuthTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: undefined };
        case AuthTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: true, data: action.payload };
        case AuthTypes.LOAD_LOGOFF:
            return { ...state, loading: false, error: true, data: undefined };
        default:
            return state;
    }
}

export default reducer