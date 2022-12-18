import { RoomsState, RoomsTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: RoomsState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<RoomsState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case RoomsTypes.SYNC_DATA:
            return { ...state, loading: true, error: false, data: [] };
        case RoomsTypes.SYNC_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload };
        case RoomsTypes.SYNC_STOP:
            return { ...state, loading: false, data: [] };
        case RoomsTypes.SYNC_ERROR:
            return { ...state, loading: false, error: true, data: [] };
        default:
            return state;
    }
}

export default reducer