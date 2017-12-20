import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import { ConnectedRouter as Router, push } from 'react-router-redux'
import { history } from '../configureStore'
import { testAction } from '../actions'
import { fetchTokenLogin } from '../actions/loginAction'
import Home from './Home'
import Login from './Login'
import Upload from './Upload'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} {...rest}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.testAction()
        this.props.fetchTokenLogin(this.props.token)
    }
    render() {
        const {token} = this.props
        console.log('token:', token)
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/Login" component={Login}/>
                        <PrivateRoute exact path="/" component={Home}/>
                        <PrivateRoute path="/home" component={Home} isAuthenticated={token}/>
                        <PrivateRoute path="/upload-picture" component={Upload} isAuthenticated={token}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default connect(state => ({
    token: state.app.token
}), {
    testAction,
    fetchTokenLogin
})(App)
