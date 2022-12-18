import { action } from 'typesafe-actions'
import { Room, RoomsTypes } from './types'


export const syncData = () => action(RoomsTypes.SYNC_DATA)

export const syncSuccess = (dataAsync: Room[]) => action(RoomsTypes.SYNC_SUCCESS, dataAsync)

export const syncStop = () => action(RoomsTypes.SYNC_STOP)

export const syncError = () => action(RoomsTypes.SYNC_ERROR)
