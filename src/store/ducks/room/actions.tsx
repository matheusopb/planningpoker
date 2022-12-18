import { action } from 'typesafe-actions'
import { Room, RoomTypes } from './types'


export const syncData = (id: string) => action(RoomTypes.SYNC_DATA, id)

export const syncSuccess = (data: Room) => action(RoomTypes.SYNC_SUCCESS, data)

export const syncStop = () => action(RoomTypes.SYNC_STOP)

export const syncError = () => action(RoomTypes.SYNC_ERROR)


export const addData = (name: string) => action(RoomTypes.ADD_DATA, name)

export const addSuccess = () => action(RoomTypes.ADD_SUCCESS)

export const addError = () => action(RoomTypes.ADD_ERROR)


export const editData = (room: Room) => action(RoomTypes.EDIT_DATA, room)

export const editSuccess = () => action(RoomTypes.EDIT_SUCCESS)

export const editError = () => action(RoomTypes.EDIT_ERROR)


export const rmData = (id: string) => action(RoomTypes.RM_DATA, id)

export const rmSuccess = () => action(RoomTypes.RM_SUCCESS)

export const rmError = () => action(RoomTypes.RM_ERROR)
