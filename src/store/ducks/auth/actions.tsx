import { action } from 'typesafe-actions'
import { Auth, AuthTypes } from './types'


export const loadRequest = () => action(AuthTypes.LOAD_REQUEST)

export const loadFailure = () => action(AuthTypes.LOAD_FAILURE)

export const loadSuccess = (data: Auth) => action(AuthTypes.LOAD_SUCCESS, data)

export const loadLogoff = () => action(AuthTypes.LOAD_LOGOFF)

export const loadRequestCredential = () => action(AuthTypes.LOAD_REQUEST_CREDENTIAL)



