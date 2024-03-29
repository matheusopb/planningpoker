import { RoomState, RoomTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: RoomState = {
    room: undefined,
    errors: {
        data: false,
        add: false,
        edit: false,
        rm: false
    },
    loadings: {
        data: false,
        add: false,
        edit: false,
        rm: false
    },
}

const reducer: Reducer<RoomState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case RoomTypes.SYNC_DATA:
            return { ...state, loadings: { ...state.loadings, data: true }, errors: { ...state.errors, data: false }, room: undefined };
        case RoomTypes.SYNC_SUCCESS:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, room: action.payload };
        case RoomTypes.SYNC_STOP:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, room: undefined };
        case RoomTypes.SYNC_ERROR:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: true }, room: undefined };

        case RoomTypes.ADD_DATA:
            return { ...state, loadings: { ...state.loadings, add: true }, errors: { ...state.errors, add: false } };
        case RoomTypes.ADD_ERROR:
            return { ...state, loadings: { ...state.loadings, add: false }, errors: { ...state.errors, add: true } };
        case RoomTypes.ADD_SUCCESS:
            return { ...state, loadings: { ...state.loadings, add: false }, errors: { ...state.errors, add: false } };

        case RoomTypes.EDIT_DATA:
            return { ...state, loadings: { ...state.loadings, edit: true }, errors: { ...state.errors, edit: false } };
        case RoomTypes.EDIT_ERROR:
            return { ...state, loadings: { ...state.loadings, edit: false }, errors: { ...state.errors, edit: true } };
        case RoomTypes.EDIT_SUCCESS:
            return { ...state, loadings: { ...state.loadings, edit: false }, errors: { ...state.errors, edit: false } };


        case RoomTypes.RM_DATA:
            return { ...state, loadings: { ...state.loadings, rm: true }, errors: { ...state.errors, rm: false } };
        case RoomTypes.RM_ERROR:
            return { ...state, loadings: { ...state.loadings, rm: false }, errors: { ...state.errors, rm: true } };
        case RoomTypes.RM_SUCCESS:
            return { ...state, loadings: { ...state.loadings, rm: false }, errors: { ...state.errors, rm: false } };
        default:
            return state;
    }
}

export default reducer