import { action } from 'typesafe-actions'
import { Room, RoomTypes, User } from './types'


export const syncData = (id: string) => action(RoomTypes.SYNC_DATA, id)

export const syncSuccess = (data: Room) => action(RoomTypes.SYNC_SUCCESS, data)

export const syncStop = () => action(RoomTypes.SYNC_STOP)

export const syncUsersData = (id: string) => action(RoomTypes.SYNC_USERS_DATA, id)

export const syncUsersSuccess = (user: User[]) => action(RoomTypes.SYNC_USERS_SUCCESS, user)

export const syncUsersAdd = (user: User[]) => action(RoomTypes.SYNC_USERS_ADD, user)

export const syncUsersEdit = (user: User[]) => action(RoomTypes.SYNC_USERS_EDIT, user)

export const syncUsersStop = () => action(RoomTypes.SYNC_USERS_STOP)

export const syncVotesData = () => action(RoomTypes.SYNC_VOTES_DATA)

export const syncVotesSuccess = (user: User[]) => action(RoomTypes.SYNC_VOTES_SUCCESS, user)

export const syncVotesStop = () => action(RoomTypes.SYNC_VOTES_STOP)