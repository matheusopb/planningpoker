
/**
 * Actions Types
 */
export enum RoomsTypes {
    LOAD_REQUEST = '@rooms/LOAD_REQUEST',
    LOAD_SUCCES = '@rooms/LOAD_SUCCES',
    LOAD_FAILURE = '@rooms/LOAD_FAILURE',
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
    readonly loading: boolean,
    readonly error: boolean
}

