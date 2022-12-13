import { SagaIterator } from "redux-saga"
import { call, delay, fork, put, race, select, take } from "redux-saga/effects"
import firebase from 'firebase/compat/app';
import { loadSuccess, loadFailure } from "../ducks/auth/actions";
import secureLocalStorage from "react-secure-storage";
import { OAuthCredential } from "firebase/auth";
import rsf from '../../settings/env'
import { UserState } from "../ducks/user/types";
import { getUser } from "./functions";
import { addData, loadRequest, syncData } from "../ducks/user/actions";

export function* loginFb(): SagaIterator {
    try {
        const result = yield call(signInWithGoogle)
        if (result === 'error') {
            throw new Error("Erro ao fazer login")
        } else {

            yield put(loadRequest(result.user.uid))
            yield put(syncData(result.user.uid))

            const { timeout, failure } = yield race({
                failure: take('@user/LOAD_FAILURE'),
                success: take('@user/LOAD_SUCCESS'),
                timeout: delay(10000),
            })
            if (failure || timeout) {
                throw new Error(" erro ao buscar usuario");
            }
            let { staticUser }: UserState = yield select(getUser);
            console.log('staticUser', staticUser)

            if (staticUser === undefined) {
                console.log('criando user',)

                yield put(addData({
                    email: result.user.email,
                    id: result.user?.uid,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                }))
            }
            secureLocalStorage.setItem("object", result.credential);
            yield put(loadSuccess(result.user))
        }
    } catch (err) {
        yield put(loadFailure())
    }
}

export function* loginWithCredential(): SagaIterator {
    try {
        const credential = secureLocalStorage.getItem("object") as string
        const cred = OAuthCredential.fromJSON(credential)
        const result = yield call(signInWithCredential, cred)
        if (result === 'error') {
            throw new Error("Erro ao fazer login")
        } else {
            yield put(loadSuccess(result.user))
            yield put(syncData(result.user.uid))
        }
    } catch (err) {
        yield put(loadFailure())
    }
}

export function* loginOutFb(): SagaIterator {
    try {
        secureLocalStorage.clear();
        const result = yield call(signOut)
    } catch (err) {
    }
}

export const signInWithCredential = async (credential: any) => {
    try {
        const auth = firebase.auth()
        return await auth.signInWithCredential(credential);
    }
    catch (err) {
        return 'error'
    }
};

export const signInWithGoogle = async () => {
    try {
        const auth = firebase.auth()
        const AuthCredential = new firebase.auth.OAuthProvider('google.com')

        return await auth.signInWithPopup(AuthCredential);

    }
    catch (err) {
        return 'error'
    }
};

export const signOut = async () => {
    try {
        const auth = firebase.auth()
        return await auth.signOut()
    }
    catch (err) {
        return 'error'
    }
};
