import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {Comment} from '../../components'
import img from '../../assets/span.jpg'

class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <h2>Home</h2>
            <li><Link to="/upload-picture">上传图片</Link></li>
            {/* <Comment img={img}/> */}
        </div>
    }
}

export default connect()(Home)
