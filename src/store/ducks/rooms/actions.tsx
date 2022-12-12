import { action } from 'typesafe-actions'
import { Room, RoomsTypes } from './types'


export const loadRequest = () => action(RoomsTypes.LOAD_REQUEST)

export const loadFailure = () => action(RoomsTypes.LOAD_FAILURE)

export const loadSuccess = (data: Room[]) => action(RoomsTypes.LOAD_SUCCESS, data)

export const syncData = () => action(RoomsTypes.SYNC_DATA)

export const syncSuccess = (dataAsync: Room[]) => action(RoomsTypes.SYNC_SUCCESS, dataAsync)

export const syncStop = () => action(RoomsTypes.SYNC_STOP)
