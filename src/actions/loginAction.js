import {FETCH_LOGIN} from '../constants/ActionTypes'

export fetchLogin = (username, password) => {
    type: FETCH_LOGIN,
    username,
    password,
}
