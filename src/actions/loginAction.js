import {FETCH_LOGIN} from '../constants/ActionTypes'

export const fetchLogin = (username, password) => ({
    type: FETCH_LOGIN,
    username,
    password,
})
