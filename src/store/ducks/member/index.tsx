import { MemberState, MemberTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: MemberState = {
    members: [],
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

const reducer: Reducer<MemberState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case MemberTypes.SYNC_DATA:
            return { ...state, loadings: { ...state.loadings, data: true }, errors: { ...state.errors, data: false }, members: [] };
        case MemberTypes.SYNC_SUCCESS:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, members: action.payload };
        case MemberTypes.SYNC_STOP:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, members: [] };
        case MemberTypes.SYNC_ERROR:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: true }, members: [] };

        case MemberTypes.ADD_DATA:
            return { ...state, loadings: { ...state.loadings, add: true }, errors: { ...state.errors, add: false } };
        case MemberTypes.ADD_ERROR:
            return { ...state, loadings: { ...state.loadings, add: false }, errors: { ...state.errors, add: true } };
        case MemberTypes.ADD_SUCCESS:
            return { ...state, loadings: { ...state.loadings, add: false }, errors: { ...state.errors, add: false } };

        case MemberTypes.EDIT_DATA:
            return { ...state, loadings: { ...state.loadings, edit: true }, errors: { ...state.errors, edit: false } };
        case MemberTypes.EDIT_ERROR:
            return { ...state, loadings: { ...state.loadings, edit: false }, errors: { ...state.errors, edit: true } };
        case MemberTypes.EDIT_SUCCESS:
            return { ...state, loadings: { ...state.loadings, edit: false }, errors: { ...state.errors, edit: false } };

        case MemberTypes.RM_DATA:
            return { ...state, loadings: { ...state.loadings, rm: true }, errors: { ...state.errors, rm: false } };
        case MemberTypes.RM_ERROR:
            return { ...state, loadings: { ...state.loadings, rm: false }, errors: { ...state.errors, rm: true } };
        case MemberTypes.RM_SUCCESS:
            return { ...state, loadings: { ...state.loadings, rm: false }, errors: { ...state.errors, rm: false } };
        default:
            return state;
    }
}

export default reducer