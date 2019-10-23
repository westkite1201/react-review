import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import axios from 'axios'
import Login from '../Login'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import './Navigation.scss'
let swRegistration = null;
let isSubscribed = false;

@observer
class Navigation extends Component {
    @observable button = '';
    @observable key = '';
    componentDidMount(){
        axios.get('/api/notification/vapid', { 
            headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}
        }).then( res =>{
            this.key = res.data;
            console.log(res.data)
            console.log(this.key)
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                navigator.serviceWorker.register('/sw.js').then(
                    (swReg) => {
                        //'Service Worker is registered'
                        swRegistration = swReg;
                        console.log('oooooo!',swReg)
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
                this.button = <NotificationsActiveIcon onClick = {this.unsubscribeUser} />
                console.log('issubscribed')
            } else {
                this.button = <NotificationsOffIcon onClick = {this.subscribeUser} />
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
              this.button = <NotificationsActiveIcon onClick = {this.unsubscribeUser} />
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
            this.button = <NotificationsOffIcon onClick = {this.subscribeUser}/>
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
    render() {
        return (
            <div className = 'wrapperRoot'>
                <NavLink to='/' className = 'linkItem'>Home</NavLink>
                <NavLink to='/login' className = 'linkItem'>Login</NavLink>
                {this.button}
            </div>
        )
    }
}
export default Navigation