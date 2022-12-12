import { SagaIterator } from "redux-saga"
import { call, put } from "redux-saga/effects"
import firebase from 'firebase/compat/app';
import { loadSuccess, loadFailure } from "../ducks/auth/actions";
import secureLocalStorage from "react-secure-storage";
import { OAuthCredential } from "firebase/auth";

export function* loginFb(): SagaIterator {
    try {
        console.log('sagas loginFb')
        const result = yield call(signInWithGoogle)
        if (result === 'error') {
            throw new Error("Erro ao fazer login")
        } else {
            console.log('result', result)
            secureLocalStorage.setItem("object", result.credential);
            console.log('result.user', result.user)
            yield put(loadSuccess(result.user))
        }
    } catch (err) {
        yield put(loadFailure())
    }
}

export function* loginWithCredential(): SagaIterator {
    try {

        console.log('loginWithCredential')

        const credential = secureLocalStorage.getItem("object") as string
        const cred = OAuthCredential.fromJSON(credential)

        const result = yield call(signInWithCredential, cred)

        console.log('result', result)

        if (result === 'error') {
            throw new Error("Erro ao fazer login")
        } else {
            console.log('result', result)
            yield put(loadSuccess(result.user))
        }
    } catch (err) {
        yield put(loadFailure())
    }
}

export function* loginOutFb(): SagaIterator {
    try {
        console.log('sagas loginOutFb')
        secureLocalStorage.clear();

        const result = yield call(signOut)
        console.log('result ', result)
    } catch (err) {
        console.log('Error in saga!:', err)
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