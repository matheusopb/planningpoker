import { action } from 'typesafe-actions'
import { User, UserTypes } from './types'

export const syncData = (id: string) => action(UserTypes.SYNC_DATA, id)

export const syncSuccess = (data: User) => action(UserTypes.SYNC_SUCCESS, data)

export const syncStop = () => action(UserTypes.SYNC_STOP)


export const loadRequest = (id: string) => action(UserTypes.LOAD_REQUEST, id)

export const loadFailure = () => action(UserTypes.LOAD_FAILURE)

export const loadSuccess = (data: User | undefined) => action(UserTypes.LOAD_SUCCESS, data)


export const addData = (data: User) => action(UserTypes.LOAD_ADD, data)

export const editData = (data: User) => action(UserTypes.LOAD_EDIT, data)

