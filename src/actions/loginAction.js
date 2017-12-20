import {FETCH_LOGIN, TOKEN_LOGIN} from '../constants/ActionTypes'

export const fetchLogin = (username, password) => ({
    type: FETCH_LOGIN,
    username,
    password,
})

export const fetchTokenLogin = () => ({
    type: TOKEN_LOGIN
})
