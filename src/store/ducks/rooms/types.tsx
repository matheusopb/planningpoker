
/**
 * Actions Types
 */
export enum RoomsTypes {
    LOAD_REQUEST = '@rooms/LOAD_REQUEST',
    LOAD_SUCCESS = '@rooms/LOAD_SUCCESS',
    LOAD_FAILURE = '@rooms/LOAD_FAILURE',
    SYNC_DATA = '@rooms/SYNC_DATA',
    SYNC_STOP = '@rooms/SYNC_STOP',
    SYNC_SUCCESS = '@rooms/SYNC_SUCCESS',
}

/**
 * Data types
 */
export interface Room {
    id: number,
    name: string
}

/**
 * State types
 */
export interface RoomsState {
    readonly data: Room[],
    readonly dataAsync: Room[],
    readonly loading: boolean,
    readonly error: boolean
}


export interface RoomsActions {
    loadRequest(): void,
    syncStop(): void,
    syncData(): void,

}
