import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Exercise } from '../../components'

class ExerciseContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <Exercise/>
        </div>
    }
}

export default connect()(ExerciseContainer)
