import React, { Component } from 'react'
import axios from 'axios'
class Login extends Component {
    clickLogin = () => {
        console.log('object')
        axios.get('/login', {
            
        }).then((res)=>{
            console.log(res.data)
            window.location = res.data;
        })
    }
    render() {
        return (
            <div>
                <img src = '/images/btn_google_signin_dark_normal_web@2x.png' onClick = {this.clickLogin}/>
            </div>
        )
    }
}
export default Login