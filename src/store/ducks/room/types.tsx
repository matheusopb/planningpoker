
/**
 * Actions Types
 */
export enum RoomTypes {
    SYNC_USERS_DATA = '@room/users/SYNC_DATA',
    SYNC_USERS_STOP = '@room/users/SYNC_STOP',
    SYNC_USERS_SUCCESS = '@room/users/SYNC_SUCCESS',
    SYNC_USERS_ADD = '@room/users/SYNC_USERS_ADD',
    SYNC_USERS_EDIT = '@room/users/SYNC_USERS_EDIT',
    SYNC_VOTES_DATA = '@room/votes/SYNC_DATA',
    SYNC_VOTES_STOP = '@room/votes/SYNC_STOP',
    SYNC_VOTES_SUCCESS = '@room/votes/SYNC_SUCCESS',
    SYNC_DATA = '@room/SYNC_DATA',
    SYNC_STOP = '@room/SYNC_STOP',
    SYNC_SUCCESS = '@room/SYNC_SUCCESS',
}

/**
 * Data types
 */
export interface Room {
    id: string,
    name: string
}
export interface User {
    id: string,
    name: string,
    type: UserType,
}
export type UserType = 'admin' | 'request' | 'simple';

export interface Vote {
    user: User,
    task: number,
    vote: number,
}

/**
 * State types
 */
export interface RoomState {
    readonly room: Room | undefined,
    readonly users: User[],
    readonly votes: Vote[],
    readonly loading: boolean
    readonly error: boolean
}

export interface RoomActions {
    syncStop(): void,
    syncData(id: string): void,
    syncUsersData(id: string): void
}
