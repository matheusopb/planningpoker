import { Room } from "../room/types";
import { User } from "../user/types"

/**
 * Actions Types
 */
export enum MemberTypes {
    SYNC_DATA = '@member/SYNC_DATA',
    SYNC_STOP = '@member/SYNC_STOP',
    SYNC_SUCCESS = '@member/SYNC_SUCCESS',
    SYNC_ERROR = '@member/SYNC_ERROR',
    ADD_DATA = '@member/ADD_DATA',
    ADD_SUCCESS = '@member/ADD_SUCCESS',
    ADD_ERROR = '@member/ADD_ERROR',
    EDIT_DATA = '@member/EDIT_DATA',
    EDIT_SUCCESS = '@member/EDIT_SUCCESS',
    EDIT_ERROR = '@member/EDIT_ERROR',
    RM_DATA = '@member/RM_DATA',
    RM_SUCCESS = '@member/RM_SUCCESS',
    RM_ERROR = '@member/RM_ERROR',
}

/**
 * Data types
 */
export type MemberType = 'admin' | 'request' | 'user';

export interface Member {
    id?: string,
    roomId: string,
    userId: string,
    type: MemberType
    userData: User,
}

/**
 * State types
 */
export interface MemberState {
    readonly members: Member[],
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

export interface MemberActions {
    syncStop(): void,
    syncData(roomId: string): void,
    addData(member: Member): void,
    editData(member: Member): void,
    rmData(id: string): void,
}
