import { action } from 'typesafe-actions'
import { Member, MemberTypes } from './types'


export const syncData = (roomId: string) => action(MemberTypes.SYNC_DATA, roomId)

export const syncSuccess = (members: Member[]) => action(MemberTypes.SYNC_SUCCESS, members)

export const syncStop = () => action(MemberTypes.SYNC_STOP)

export const syncError = () => action(MemberTypes.SYNC_ERROR)


export const addData = (member: Member) => action(MemberTypes.ADD_DATA, member)

export const addSuccess = () => action(MemberTypes.ADD_SUCCESS)

export const addError = () => action(MemberTypes.ADD_ERROR)


export const editData = (member: Member) => action(MemberTypes.EDIT_DATA, member)

export const editSuccess = () => action(MemberTypes.EDIT_SUCCESS)

export const editError = () => action(MemberTypes.EDIT_ERROR)


export const rmData = (id: string) => action(MemberTypes.RM_DATA, id)

export const rmSuccess = () => action(MemberTypes.RM_SUCCESS)

export const rmError = () => action(MemberTypes.RM_ERROR)
