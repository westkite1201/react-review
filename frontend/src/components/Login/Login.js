import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
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
                console.log(this.auth2)
                this.props.setAuth(this.auth2)
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
                    this.props.login(res.data)
                    this.props.history.push('/');
            })
        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
    }
    componentDidMount(){
        this.googleSDK();
        if(this.props.auth){
            this.auth2 = this.props.auth;
            this.prepareLoginButton()
        }
    }
    render() {
        return (
            <div className = 'LoginRoot'>
                <div className = 'LoginContentBox'>
                    <div className='LoginContent'>언제 어디서나 공부한 내용을 정리하고 복습하세요.</div>
                    <div className='LoginContent'>공부한 내용을 다시 볼 수 있도록 알려드릴께요.</div>
                    <div className='LoginContent'>지금 Google ID로 로그인하기</div>        
                </div>
                <img className = 'LoginImage'
                     src = '/images/btn_google_signin_light_normal_web.png' 
                     ref = 'googleLoginBtn' />
            </div>
        )
    }
}
export default inject(({posts})=> ({
    login: posts.login,
    auth: posts.auth,
    setAuth: posts.setAuth
}))(observer(Login))