import { put, take, call, select } from 'redux-saga/effects';
import {FETCH_LOGIN, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR} from '../constants/ActionTypes'
import {fetchLogin} from '../api'

function * fetchLogin (username, password) {
    try {
        yield put({ type: FETCH_LOGIN, fetching: true})
        const {access_token} = yield call(fetchLogin, username, password)
    }
}

export default {
    watchLogin: function * (store) {
        while(true) {
            const {username, password} = yield take(FETCH_LOGIN)
            const token = yield call(fetchLogin, username, password, store)
        }
    }
}
