import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import Navigation from '../../components/Navigation'
import Posts from '../../components/Posts'
import Login from '../../components/Login'
import Write from '../../components/Write'
import Post from '../../components/Post'
import App from '../../App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Wrapper extends Component {
    
    render() {
        return (
            <div>
                <ToastContainer/>
                <Navigation/>
                <Route exact path = "/" component={Posts}/>
                <Route exact path = "/app" component={App}/>
                <Route exact path = "/login" component={Login}/>
                <Route exact path = "/write" component={Write}/>
                <Route path = '/post/:postId' component = {Post}/>
            </div>
        )
    }
}
export default Wrapper