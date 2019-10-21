import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import axios from 'axios'

import AddCircleIcon from '@material-ui/icons/AddCircle'

import InputTable from './InputTable/InputTable'
import Review from './Review/Review'
import './Reviews.scss'
@observer
class Reviews extends Component {
    @observable reviews = [];
    @observable switch = '';
    @action
    addReview = () => {
        console.log("object")
        if(this.switch===''){
            console.log('in')
            this.switch = <InputTable pullInput = {this.pullInput}/>
        }else{
            this.switch = ''
        }
    }
    @action
    pullInput = (obj) =>{
        this.reviews.push(obj)
        console.log(this.reviews)
        console.log(JSON.stringify(this.reviews))
        localStorage.setItem('mylist', JSON.stringify(this.reviews))
        axios.post('/api/posts/savePost',
            { obj: obj },
            { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
        ).then( (res) => {
            console.log(res)
        })
        
        //token, obj.
        
        this.switch = ''
    }
    @action
    setUpList = (list) => {
        this.reviews = list;
    }
    componentDidMount(){
        let postsList = localStorage.getItem('mylist');
        if(!postsList){
            let jwt = localStorage.getItem('jwt'); 
            if(jwt){
                axios.get('/api/posts/posts', {
                    headers: {
                        'Authorization': 'bearer '+ jwt
                    }
                }).then( res =>{
                    console.log(res)
                    localStorage.setItem('mylist', JSON.stringify(res.data));
                    this.setUpList(res.data);
                })
            }
        }else{
            this.setUpList(JSON.parse(postsList));
        }
    }
    createList = (list) => {
        return list.map((item, i) => {
            return(
                <Review obj = {item}
                        key = {i}/>
            )
        })
    }
    render() {
        return (
            <div className = 'ReviewsRoot'>
                {this.switch}
                <AddCircleIcon className='icon' fontSize = 'large' onClick = {this.addReview}/>
                {this.createList(this.reviews)}
            </div>
        )
    }
}
export default Reviews