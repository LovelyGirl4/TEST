/*
*将本地图片上传到服务器，获得图片url
*上传时对图片进行压缩
*上传时对图片进行裁剪
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Upload, message, Button, Icon } from 'antd'
import { uploadPicture } from '../../actions/uploadAction'

class UploadContainer extends Component {
    constructor(props) {
        super(props)
    }
    // customRequest覆盖upload默认的上传行为，自定义自己的上传实现
    customRequest = (file) => {
        // 调接口上传图片
        this.props.uploadPicture(file.file)
    }
    componentWillReceiveProps(nextProps) {
        const {fileList} = nextProps
        console.log('fileList222:', fileList)
    }
    render() {
        const {fileList} = this.props
        console.log('fileList:', fileList)
        return <div style={{margin: '200px 500px'}}>
            <Upload listType='picture' customRequest={this.customRequest} fileList={fileList}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
        </div>
    }
}

export default connect(
    ({upload}) => ({
        fileList: upload.picture
    }),
    {uploadPicture}
)(UploadContainer)
