import {UPLOAD_PICTURE_SUCCESS} from '../constants/ActionTypes'

const initialState = {
    picture: {}
}

const upload = (state = initialState, action) => {
    switch (action.type) {
    case UPLOAD_PICTURE_SUCCESS:
        return {...state, picture: action.picture}
    default:
        return state
    }
}

export default upload
