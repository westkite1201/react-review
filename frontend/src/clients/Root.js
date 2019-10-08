import React, { Component } from 'react'
import { Route, BrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../components/Login'
const Root = () =>(
    <BrowserRouter>
        <Route exact path = "/" component={App}/>
        <Route exact path = "/login" component={Login}/>
    </BrowserRouter>
);
export default Root;