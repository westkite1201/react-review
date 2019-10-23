import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer, inject} from 'mobx-react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import AddCircleIcon from '@material-ui/icons/AddCircle'

import InputTable from './InputTable/InputTable'
import Review from './Review/Review'
import './Reviews.scss'
@observer
class Reviews extends Component {
    componentDidMount(){
        const {setUpList} = this.props;
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
                    setUpList(res.data);
                })
            }
        }else{
            setUpList(JSON.parse(postsList));
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
                <NavLink to='/write' >
                    <AddCircleIcon className = 'icon' 
                                   fontSize  = 'large'/>
                </NavLink>
                {this.createList(this.props.posts)}
            </div>
        )
    }
}
export default inject(({posts}) => ({
    setUpList: posts.setUpList,
    posts: posts.posts,
}))(observer(Reviews));