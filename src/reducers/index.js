import { combineReducers } from 'redux'
import app from './app'
import login from './loginReducer'
import upload from './uploadReducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    app,
    login,
    upload,
    router: routerReducer
})
