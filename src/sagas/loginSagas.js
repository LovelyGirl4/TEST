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

function * tokenLoginFunc (token) {
    try {
        // const access_token = yield select(state => state.app.token)
        const access_token = window.localStorage.getItem('token')
        console.log('access_token:', access_token)
        yield put({ type: TOKEN_LOGIN_SUCCESS, token: access_token })
    } catch(e) {
        console.log(e)
    }
}

export default {
    watchLogin: function * (store) {
        while(true) {
            const {username, password} = yield take(FETCH_LOGIN)
            const token = yield call(fetchLoginFunc, username, password, store)
        }
    },
    watchTokenLogin: function * (store) {
        while(true) {
            const {token} = yield take(TOKEN_LOGIN)
            yield call(tokenLoginFunc, token, store)
        }
    }
}
