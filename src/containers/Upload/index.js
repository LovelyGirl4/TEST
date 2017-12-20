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
        console.log('file:', file)
        this.props.uploadPicture(file)
    }
    render() {
        return <div style={{margin: '200px 500px'}}>
            <Upload listType='picture' customRequest={this.customRequest}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
        </div>
    }
}

export default connect(
    () => ({}),
    {uploadPicture}
)(UploadContainer)
