import {REQUEST_POSTS, AUTHENTICATED_SUCCESS} from '../constants/ActionTypes'
const initialState = {
    test: 'test',
    token: ''
}

const app = (state = initialState, action) => {
    switch (action.type) {
    case REQUEST_POSTS:
        return state
    case AUTHENTICATED_SUCCESS:
        return {...state, token: action.token}
    default:
        return state
    }
}

export default app
