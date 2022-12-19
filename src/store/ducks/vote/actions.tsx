import { action } from 'typesafe-actions'
import { Vote, VoteTypes } from './types'


export const syncData = (roomId: string, round: number) => action(VoteTypes.SYNC_DATA, { roomId, round })

export const syncSuccess = (votes: Vote[]) => action(VoteTypes.SYNC_SUCCESS, votes)

export const syncStop = () => action(VoteTypes.SYNC_STOP)

export const syncError = () => action(VoteTypes.SYNC_ERROR)


export const addData = (vote: Vote) => action(VoteTypes.ADD_DATA, vote)

export const addSuccess = () => action(VoteTypes.ADD_SUCCESS)

export const addError = () => action(VoteTypes.ADD_ERROR)


export const editData = (vote: Vote) => action(VoteTypes.EDIT_DATA, vote)

export const editSuccess = () => action(VoteTypes.EDIT_SUCCESS)

export const editError = () => action(VoteTypes.EDIT_ERROR)


export const rmData = (id: string) => action(VoteTypes.RM_DATA, id)

export const rmSuccess = () => action(VoteTypes.RM_SUCCESS)

export const rmError = () => action(VoteTypes.RM_ERROR)
