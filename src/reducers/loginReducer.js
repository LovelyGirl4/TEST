import {FETCH_LOGIN_SUCCESS, TOKEN_LOGIN_SUCCESS} from '../constants/ActionTypes'

const initialState = {
    token: ''
}

const login = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
        return {...state, token: action.token}
    case TOKEN_LOGIN_SUCCESS:
        return {...state, token: action.token}
    default:
        return state
    }
}

export default login
