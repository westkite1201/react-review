import React, { Component } from 'react'
import axios from 'axios'
import { generateKeyPair } from 'crypto'
class Login extends Component {
    googleSDK(){
        window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                    client_id: '1022917972003-7mlacjodhaq1j7fs8a27lm7hga94ldif.apps.googleusercontent.com',
                    cookiepolicy: 'none',
                    scope: 'profile email',
                    
                });
                this.prepareLoginButton();
            })
            console.log(window.gapi)
        }
        (function(document,script,id){
            var js, fjs = document.getElementsByTagName(script)[0];
            if(document.getElementById(id)){return;}
            js = document.createElement(script); js.id = id;
            js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
            fjs.parentNode.insertBefore(js,fjs);
        }(document,'script', 'google-jssdk'))
    }
    prepareLoginButton = () =>{
        this.auth2.attachClickHandler(this.refs.googleLoginBtn,{},(googleUser) => {
            let jwt = googleUser.getAuthResponse().id_token;
            axios.post('/api/oauth/sendToken',
                '',
                {
                    headers: {'Authorization': 'bearer '+ jwt}
                }).then( (res) => {
                    localStorage.setItem('jwt', res.data)
            })
        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
    }
    componentDidMount(){
        this.googleSDK();
    }
    render() {
        return (
            <div>
                <img src = '/images/btn_google_signin_dark_normal_web@2x.png' ref = 'googleLoginBtn' />
            </div>
        )
    }
}
export default Login