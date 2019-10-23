import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import axios from 'axios'
import { Route} from 'react-router-dom'
import Navigation from '../../components/Navigation'
import Reviews from '../../components/Reviews'
import Login from '../../components/Login'
import Write from '../../components/Write'
import App from '../../App'
@observer
class Wrapper extends Component {
    
    render() {
        return (
            <div>
                <Navigation/>
                <Route exact path = "/" component={Reviews}/>
                <Route exact path = "/app" component={App}/>
                <Route exact path = "/login" component={Login}/>
                <Route exact path = "/write" component={Write}/>
            </div>
        )
    }
}
export default Wrapper