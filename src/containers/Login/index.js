import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from '../../components/Login/Login'
import img from '../../assets/span.jpg'
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
