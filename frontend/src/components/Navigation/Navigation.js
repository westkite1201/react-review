import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import axios from 'axios'
import Login from '../Login'
@observer
class Navigation extends Component {
    
    render() {
        return (
            <div>
                <Login/>
            </div>
        )
    }
}
export default Navigation