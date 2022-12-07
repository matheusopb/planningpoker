import { action } from 'typesafe-actions'
import { Room, RoomsTypes } from './types'


export const loadRequest = () => action(RoomsTypes.LOAD_REQUEST)

export const loadFailure = () => action(RoomsTypes.LOAD_FAILURE)

export const loadSucces = (data: Room[]) => action(RoomsTypes.LOAD_SUCCES, data)
