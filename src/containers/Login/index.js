/*
*登录页面：输入账号、密码，点击确认按钮调接口获取token存入store，然后跳转到首页
*username: Test@qq.com pwd: 123123
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from '../../components/Login/Login'
import {fetchLogin} from '../../actions/loginAction'

class Home extends Component {
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
    {fetchLogin}
)(Home)
