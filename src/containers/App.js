import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import { ConnectedRouter as Router, push } from 'react-router-redux'
import { history } from '../configureStore'
import {testAction} from '../actions'
import Home from './Home'
import Login from './Login'

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

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
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <PrivateRoute path="/home" component={Home} isAuthenticated={token}/>
                        <Route exact path="/Login" component={Login}/>
                        <Route path="/about" component={About}/>
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
