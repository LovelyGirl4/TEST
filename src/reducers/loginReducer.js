import {FETCH_LOGIN_SUCCESS} from '../constants/ActionTypes'

const initialState = {}

const login = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
        return {...state}
    default:
        return state
    }
}

export default login
