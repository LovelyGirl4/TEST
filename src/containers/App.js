import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import { ConnectedRouter as Router, push } from 'react-router-redux'
import { history } from '../configureStore'
import {testAction} from '../actions'
import Home from './Home'
import Login from './Login'

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
    }
    render() {
        const {token} = this.props
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/Login" component={Login}/>
                        <PrivateRoute exact path="/" component={Home}/>
                        <PrivateRoute path="/home" component={Home} isAuthenticated={token}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default connect(state => ({
    token: state.app.token
}), {
    testAction
})(App)
