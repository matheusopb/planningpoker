
/**
 * Actions Types
 */
export enum RoomTypes {

    SYNC_DATA = '@room/SYNC_DATA',
    SYNC_STOP = '@room/SYNC_STOP',
    SYNC_SUCCESS = '@room/SYNC_SUCCESS',
    SYNC_ERROR = '@room/SYNC_ERROR',

    ADD_DATA = '@room/ADD_DATA',
    ADD_SUCCESS = '@room/ADD_SUCCESS',
    ADD_ERROR = '@room/ADD_ERROR',

    EDIT_DATA = '@room/EDIT_DATA',
    EDIT_SUCCESS = '@room/EDIT_SUCCESS',
    EDIT_ERROR = '@room/EDIT_ERROR',

    RM_DATA = '@room/RM_DATA',
    RM_SUCCESS = '@room/RM_SUCCESS',
    RM_ERROR = '@room/RM_ERROR',
}

/**
 * Data types
 */
export interface Room {
    id: string,
    name: string,
    showVote?: number,
    hideVotes?: boolean
}

/**
 * State types
 */
export interface RoomState {
    readonly room: Room | undefined,
    readonly loadings: {
        data: boolean,
        add: boolean,
        edit: boolean,
        rm: boolean
    }
    readonly errors: {
        data: boolean,
        add: boolean,
        edit: boolean,
        rm: boolean
    }
}

export interface RoomActions {
    syncStop(): void,
    syncData(id: string): void,
    addData(name: string): void,
    editData(room: Room): void,
    rmData(id: string): void,
}
