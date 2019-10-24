import React, { Component } from 'react'
import axios from 'axios'
import './Login.scss'

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
            <div className = 'LoginRoot'>
                According to Hermann Evinghouse's forgetting curve hypothesis, 
                if there is no attempt to retain memory, 
                the extent to which memory remains decreases over time.
                Make note of things that you must remember but not easy to remember!
                sign in and sign up with google ID !
                <img className = 'LoginImage'
                     src = '/images/btn_google_signin_light_normal_web.png' 
                     ref = 'googleLoginBtn' />
            </div>
        )
    }
}
export default Login