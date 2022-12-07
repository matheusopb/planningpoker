import { RoomsState, RoomsTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: RoomsState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<RoomsState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case RoomsTypes.LOAD_REQUEST:
            return { ...state, loading: true };
        case RoomsTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] };
        case RoomsTypes.LOAD_SUCCES:
            console.log('action.payload.data', action.payload.data)
            return { ...state, loading: false, error: true, data: action.payload };
        default:
            return state;
    }
}

export default reducer