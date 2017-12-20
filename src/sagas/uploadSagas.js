import { put, take, call, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { UPLOAD_PICTURE } from '../constants/ActionTypes'
import { getUploadConfig } from '../api'
import { guid, s3FormData } from '../common'

function * uploadPicture (picture) {
    try {
        const uploadConfig = yield call(getUploadConfig, 'product', '123', 'images')
        console.log('uploadConfig:', uploadConfig)
        const {access_token} = yield select(state => state.app)
        const GUID = guid()
        let formData = yield call(s3FormData, uploadConfig, picture, GUID)
        console.log('formData:', formData)
        // yield put({ type: AUTHENTICATED_SUCCESS, token: access_token })
    } catch(e) {
        console.log(e)
    }
}

export default {
    watchUploadPicture: function * (store) {
        while(true) {
            const {picture} = yield take(UPLOAD_PICTURE)
            const token = yield call(uploadPicture, picture)
        }
    }
}
