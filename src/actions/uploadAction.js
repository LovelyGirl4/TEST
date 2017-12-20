import {UPLOAD_PICTURE} from '../constants/ActionTypes'

export const uploadPicture = (picture) => ({
    type: UPLOAD_PICTURE,
    picture
})
