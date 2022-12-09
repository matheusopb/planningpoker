import { action } from 'typesafe-actions'
import { Auth, AuthTypes } from './types'


export const loadRequest = () => action(AuthTypes.LOAD_REQUEST)

export const loadFailure = () => action(AuthTypes.LOAD_FAILURE)

export const loadSucces = (data: Auth) => action(AuthTypes.LOAD_SUCCES, data)

export const loadLogoff = () => action(AuthTypes.LOAD_LOGOFF)
