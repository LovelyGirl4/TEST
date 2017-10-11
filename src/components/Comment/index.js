import React from 'react'
import {Input, Image} from '../../components'
import { DatePicker, Button } from 'antd'
// import 'antd/dist/antd.css';
// import Button from 'antd/lib/button';
// import 'antd/lib/button/style';
// import './index.css';

const Comment = ({img}) => {
    return <div>
        Comment: <Input></Input>
        <DatePicker/>
    <Button type='primary'>eeee</Button>
        {/* <Image url={img}/> */}
    </div>
}

export default Comment
