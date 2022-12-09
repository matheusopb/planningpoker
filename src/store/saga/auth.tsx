import { SagaIterator } from "redux-saga"
import { call, put } from "redux-saga/effects"
import firebase from 'firebase/compat/app';
import { loadSucces, loadFailure } from "../ducks/auth/actions";


export function* loginFb(): SagaIterator {
    try {
        const result = yield call(signInWithGoogle)
        if (result === 'error') {
            throw new Error("Erro ao fazer login")
        } else {
            yield put(loadSucces(result.user))
            console.log(result)
        }
    } catch (err) {
        yield put(loadFailure())
    }
}

export function* loginOutFb(): SagaIterator {
    try {
        const result = yield call(signOut)
        console.log('result ', result)
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}

export const signInWithGoogle = async () => {
    try {
        const auth = firebase.auth()
        const provider = new firebase.auth.GoogleAuthProvider();
        return await auth.signInWithPopup(provider);
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