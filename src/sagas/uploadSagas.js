import { put, take, call, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { UPLOAD_PICTURE, UPLOAD_PICTURE_SUCCESS, UPLOAD_PICTURE_ERROR } from '../constants/ActionTypes'
import { getUploadConfig, uploadFiles } from '../api'
import { guid, s3FormData } from '../common'

function * uploadPicture (picture) {
    try {
        // S3，上传文件部分 resource = 'product' id = 123 type = 'images'
        const uploadConfig = yield call(getUploadConfig, 'product', '123', 'images')
        const {access_token} = yield select(state => state.app)
        const GUID = guid()
        let formData = yield call(s3FormData, uploadConfig, picture, GUID)
        const s3_URL = yield call(uploadFiles, formData)
        let fileInfo = {
            filename: picture.name,
            url: s3_URL + `${uploadConfig.dir}/${GUID}${picture.name}`
        }
        const pictures = yield select(state => state.upload.picture)
        pictures.push(fileInfo)
        yield put({ type: UPLOAD_PICTURE_SUCCESS, picture: pictures })
    } catch(e) {
        yield put({ type: UPLOAD_PICTURE_ERROR })
        console.log(e)
    }
}

export default {
    watchUploadPicture: function * () {
        while(true) {
            const {picture} = yield take(UPLOAD_PICTURE)
            const token = yield call(uploadPicture, picture)
        }
    }
}
