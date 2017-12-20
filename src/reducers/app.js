import {REQUEST_POSTS, AUTHENTICATED_SUCCESS, TOKEN_LOGIN_SUCCESS} from '../constants/ActionTypes'
import {getToken} from '../common'
// 若token初始值不直接从缓存里面取，每次刷新页面都会重定向到登录页面
const initialState = {
    test: 'test',
    token: getToken()
}

const app = (state = initialState, action) => {
    switch (action.type) {
    case REQUEST_POSTS:
        return state
    case AUTHENTICATED_SUCCESS:
        return {...state, token: action.token}
    case TOKEN_LOGIN_SUCCESS:
        return {...state}
    default:
        return state
    }
}

export default app
