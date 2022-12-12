import { RoomsState, RoomsTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: RoomsState = {
    data: [],
    dataAsync: [],
    error: false,
    loading: false
}

const reducer: Reducer<RoomsState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case RoomsTypes.LOAD_REQUEST:
            return { ...state, loading: true };
        case RoomsTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] };
        case RoomsTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: true, data: action.payload };
        case RoomsTypes.SYNC_DATA:
            return { ...state, loading: true, error: true, dataAsync: [] };
        case RoomsTypes.SYNC_SUCCESS:
            return { ...state, loading: false, error: true, dataAsync: action.payload };
        case RoomsTypes.SYNC_STOP:
            return { ...state, dataAsync: [] };
        default:
            return state;
    }
}

export default reducer