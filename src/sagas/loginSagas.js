import { put, take, call, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {AUTHENTICATED_SUCCESS, FETCH_LOGIN, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR, TOKEN_LOGIN, TOKEN_LOGIN_SUCCESS} from '../constants/ActionTypes'
import {fetchLogin} from '../api'

function * fetchLoginFunc (username, password) {
    try {
        yield put({ type: FETCH_LOGIN, fetching: true})
        const {access_token} = yield call(fetchLogin, username, password)
        yield put({ type: AUTHENTICATED_SUCCESS, token: access_token })
        // 将token存进localStorage
        window.localStorage.setItem('token', access_token)
        yield put(push('/home'))
        yield put({ type: FETCH_LOGIN_SUCCESS })
    } catch(e) {
        console.log(e)
    }
}

function * tokenLoginFunc () {
    try {
        yield put({ type: TOKEN_LOGIN_SUCCESS })
    } catch(e) {
        console.log(e)
    }
}

export default {
    watchLogin: function * () {
        while(true) {
            const {username, password} = yield take(FETCH_LOGIN)
            const token = yield call(fetchLoginFunc, username, password)
        }
    },
    watchTokenLogin: function * () {
        while(true) {
            yield take(TOKEN_LOGIN)
            yield call(tokenLoginFunc)
        }
    }
}
