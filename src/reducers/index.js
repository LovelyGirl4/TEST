import { combineReducers } from 'redux'
import app from './app'
import login from './loginReducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    app,
    login,
    router: routerReducer
})
