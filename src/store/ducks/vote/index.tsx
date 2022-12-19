import { VoteState, VoteTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: VoteState = {
    votes: [],
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

const reducer: Reducer<VoteState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case VoteTypes.SYNC_DATA:
            return { ...state, loadings: { ...state.loadings, data: true }, errors: { ...state.errors, data: false }, votes: [] };
        case VoteTypes.SYNC_SUCCESS:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, votes: action.payload };
        case VoteTypes.SYNC_STOP:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, votes: [] };
        case VoteTypes.SYNC_ERROR:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: true }, votes: [] };

        case VoteTypes.ADD_DATA:
            return { ...state, loadings: { ...state.loadings, add: true }, errors: { ...state.errors, add: false } };
        case VoteTypes.ADD_ERROR:
            return { ...state, loadings: { ...state.loadings, add: false }, errors: { ...state.errors, add: true } };
        case VoteTypes.ADD_SUCCESS:
            return { ...state, loadings: { ...state.loadings, add: false }, errors: { ...state.errors, add: false } };

        case VoteTypes.EDIT_DATA:
            return { ...state, loadings: { ...state.loadings, edit: true }, errors: { ...state.errors, edit: false } };
        case VoteTypes.EDIT_ERROR:
            return { ...state, loadings: { ...state.loadings, edit: false }, errors: { ...state.errors, edit: true } };
        case VoteTypes.EDIT_SUCCESS:
            return { ...state, loadings: { ...state.loadings, edit: false }, errors: { ...state.errors, edit: false } };

        case VoteTypes.RM_DATA:
            return { ...state, loadings: { ...state.loadings, rm: true }, errors: { ...state.errors, rm: false } };
        case VoteTypes.RM_ERROR:
            return { ...state, loadings: { ...state.loadings, rm: false }, errors: { ...state.errors, rm: true } };
        case VoteTypes.RM_SUCCESS:
            return { ...state, loadings: { ...state.loadings, rm: false }, errors: { ...state.errors, rm: false } };
        default:
            return state;
    }
}

export default reducer