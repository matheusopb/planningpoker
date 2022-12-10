import { User } from '@firebase/auth-types';

/**
 * Actions Types
 */
export enum AuthTypes {
    LOAD_REQUEST = '@AuthTypes/LOAD_REQUEST',
    LOAD_SUCCES = '@AuthTypes/LOAD_SUCCES',
    LOAD_FAILURE = '@AuthTypes/LOAD_FAILURE',
    LOAD_LOGOFF = '@AuthTypes/LOAD_LOGOFF',
}

/**
 * Data types
 */
export type Auth = User | undefined
/**
 * State types
 */
export interface AuthState {
    readonly data: User | undefined,
    readonly loading: boolean,
    readonly error: boolean
}

export interface AuthActions {
    loadRequest: () => void,
    loadLogoff: () => void,
}
