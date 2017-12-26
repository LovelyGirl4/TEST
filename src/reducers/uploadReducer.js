import {UPLOAD_PICTURE_SUCCESS} from '../constants/ActionTypes'

const initialState = {
    picture: [
        {
            uid: -1,
            name: 'merry.png',
            url: 'http://gw-s3-dev.s3.amazonaws.com/product/123/images/ea1b6bb6-902f-39e5-ed6a-96484f8173cemerry.png'
        }
    ]
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
