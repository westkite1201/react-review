import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import axios from 'axios'
import Login from '../Login'
import './Navigation.scss'
@observer
class Navigation extends Component {
    
    render() {
        return (
            <div className = 'wrapperRoot'>
                <NavLink to='/' className = 'linkItem'>Home</NavLink>
                <NavLink to='/login' className = 'linkItem'>Login</NavLink>
            </div>
        )
    }
}
export default Navigation