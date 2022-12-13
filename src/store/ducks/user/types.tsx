
/**
 * Actions Types
 */
export enum UserTypes {
    SYNC_DATA = '@user/SYNC_DATA',
    SYNC_STOP = '@user/SYNC_STOP',
    SYNC_SUCCESS = '@user/SYNC_SUCCESS',
    LOAD_REQUEST = '@user/LOAD_REQUEST',
    LOAD_SUCCESS = '@user/LOAD_SUCCESS',
    LOAD_FAILURE = '@user/LOAD_FAILURE',
    LOAD_ADD = '@user/LOAD_ADD',
    LOAD_EDIT = '@user/LOAD_EDIT',
}

/**
 * Data types
 */
export interface User {
    id: string,
    email: string,
    name?: string,
    photoURL?: string,
}

/**
 * State types
 */
export interface UserState {
    readonly user: User | undefined,
    readonly loading: boolean
    readonly error: boolean,
    readonly staticUser: User | undefined,
    readonly staticLoading: boolean,
}

export interface UserActions {
    syncStop(): void,
    syncData(id: string): void,
    userAdd(user: User): void
    userEdit(user: User): void
    loadRequest(id: string): void
}
