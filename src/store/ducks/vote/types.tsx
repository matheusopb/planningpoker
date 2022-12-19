/**
 * Actions Types
 */
export enum VoteTypes {
    SYNC_DATA = '@vote/SYNC_DATA',
    SYNC_STOP = '@vote/SYNC_STOP',
    SYNC_SUCCESS = '@vote/SYNC_SUCCESS',
    SYNC_ERROR = '@vote/SYNC_ERROR',
    ADD_DATA = '@vote/ADD_DATA',
    ADD_SUCCESS = '@vote/ADD_SUCCESS',
    ADD_ERROR = '@vote/ADD_ERROR',
    EDIT_DATA = '@vote/EDIT_DATA',
    EDIT_SUCCESS = '@vote/EDIT_SUCCESS',
    EDIT_ERROR = '@vote/EDIT_ERROR',
    RM_DATA = '@vote/RM_DATA',
    RM_SUCCESS = '@vote/RM_SUCCESS',
    RM_ERROR = '@vote/RM_ERROR',
}

/**
 * Data types
 */

export interface Vote {
    id?: string,
    roomId: string,
    userId: string,
    round: number,
    vote: number,
}

/**
 * State types
 */
export interface VoteState {
    readonly votes: Vote[],
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

export interface VoteActions {
    syncStop(): void,
    syncData(roomId: string, round: number): void,
    addData(vote: Vote): void,
    editData(vote: Vote): void,
    rmData(id: string): void,
}
