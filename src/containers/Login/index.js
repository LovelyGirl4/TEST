import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from '../../components/Login/Login'
import img from '../../assets/span.jpg'

class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div style={{margin: '200px 500px'}}>
            <Login />
        </div>
    }
}

export default connect()(Home)
