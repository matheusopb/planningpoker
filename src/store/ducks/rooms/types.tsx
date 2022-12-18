
/**
 * Actions Types
 */
export enum RoomsTypes {
    SYNC_DATA = '@rooms/SYNC_DATA',
    SYNC_STOP = '@rooms/SYNC_STOP',
    SYNC_SUCCESS = '@rooms/SYNC_SUCCESS',
    SYNC_ERROR = '@rooms/SYNC_ERROR',
}

/**
 * Data types
 */
export interface Room {
    id: string,
    name: string
}
export interface PartialRoom {
    id?: string,
    name?: string
}
/**
 * State types
 */
export interface RoomsState {
    readonly data: Room[],
    readonly loading: boolean,
    readonly error: boolean
}


export interface RoomsActions {
    syncStop(): void,
    syncData(): void,
}
