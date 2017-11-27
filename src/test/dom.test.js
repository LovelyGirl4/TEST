import React from 'react'
import {shallow, mount, render} from 'enzyme'
import { expect } from 'chai'
import { Button } from 'antd'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

Enzyme.configure({ adapter: new Adapter() })

describe('Enzyme Shallow', function () {
    it('Comment', function () {
        let app = shallow(<Button>btn</Button>)
        expect(app.find('button').text()).to.equal('btn')
    })
})
