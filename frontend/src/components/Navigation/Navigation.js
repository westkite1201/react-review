import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {observable, action} from 'mobx'
import {observer, inject} from 'mobx-react'
import axios from 'axios'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import './Navigation.scss'
let swRegistration = null;
let isSubscribed = false;


class Navigation extends Component {
    @observable button = '';
    @observable key = '';
    componentDidMount(){
        this.getVAPID()
    }
    componentDidUpdate(prevProps, prvState, snapshot){
        if(prevProps.notiFlag !== this.props.notiFlag && this.props.notiFlag){
            this.getVAPID()
        }
        if(this.props.jwt){

        }
    }
    getVAPID = () => {
        axios.get('/api/notification/vapid', { 
            headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}
        }).then( res =>{
            this.key = res.data;
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                navigator.serviceWorker.register('/sw.js').then(
                    (swReg) => {
                        //'Service Worker is registered'
                        swRegistration = swReg;
                        this.initialiseUI();
                }).catch(
                    (error) => {
                        console.error('Service Worker Error', error);
                });
            }else{
                console.warn('Push messaging is not supported');
            }
        }).catch(err => {
            console.log(err)
        })
    }
    initialiseUI = () => {
        // Set the initial subscription value
        swRegistration.pushManager.getSubscription()
        .then((subscription) => {
            isSubscribed = !(subscription === null);
            if (isSubscribed) {
                //'User IS subscribed.'
                this.button = <NotificationsActiveIcon className = 'NaviNoti'onClick = {this.unsubscribeUser} />
                console.log('issubscribed')
            } else {
                this.button = <NotificationsOffIcon className = 'NaviNoti'onClick = {this.subscribeUser} />
                console.log('unsubscribed')
            }
        });
    }
    subscribeUser = async () => {
        let applicationServerKey;
        await this.urlB64ToUint8Array(this.key).then(res => {
            applicationServerKey = res;
            swRegistration.pushManager.subscribe({
                applicationServerKey: applicationServerKey,
                userVisibleOnly     : true,
              })
              .then((subscription) => {
                //'User is subscribed:'
                isSubscribed = true;
                axios.put("/api/user/subscribe_info", 
                    { subscribe_value: JSON.stringify(subscription)},
                    { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
                ).then((res) => {
                  console.log(res);
                });
              this.button = <NotificationsActiveIcon className = 'NaviNoti'onClick = {this.unsubscribeUser} />
              })
              .catch((err) => {
                console.log('Failed to subscribe the user: ', err);
              });
        });
        
    }
    unsubscribeUser = () => {
        swRegistration.pushManager.getSubscription()
        .then((subscription) => {
          if (subscription) {
            axios.delete("/api/user/subscribe_info", 
                { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
            ).then((res) => {
                console.log(res);
            });
            this.button = <NotificationsOffIcon className= 'NaviNoti' onClick = {this.subscribeUser}/>
            return subscription.unsubscribe();
          }
        })
        .catch((error) => {
          console.log('Error unsubscribing', error);
        })
        .then(() => {
          //updateSubscriptionOnServer(null);
          //'User is unsubscribed.'
          isSubscribed = false;
        });
    }
    urlB64ToUint8Array =(base64String) => {
        const promise = new Promise(
            (resolve, reject) => {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                resolve(outputArray)
            }
        )
        
        return promise;
    }
    @action
    logout = () => {
        this.button = ''
        this.props.logout()
    }
    render() {
        return (
            <div className = 'NavigationRoot'>
                <NavLink to='/' className = 'LinkItem'>Reminder</NavLink>
                {this.props.jwt ? <div className = 'NaviLogout'onClick = {this.logout}>Logout</div>
                                :<NavLink to='/login' className = 'LinkItem'>Login</NavLink>}
                {this.button}
            </div>
        )
    }
}
export default inject(({posts}) => ({
    notiFlag : posts.notiFlag,
    jwt: posts.jwt,
    logout: posts.logout
}))(observer(Navigation))