/*
*将本地图片上传到服务器，获得图片url
*上传时对图片进行压缩
*上传时对图片进行裁剪
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from '../../components/Login/Login'

class UploadPicture extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div style={{margin: '200px 500px'}}>
            <Login fetchLogin={this.props.fetchLogin}/>
        </div>
    }
}

export default connect(
    () => ({}),
    {}
)(UploadPicture)
