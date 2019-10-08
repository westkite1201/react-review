import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import InputTable from './InputTable/InputTable'
import Review from './Review/Review'
import axios from 'axios'
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
        this.switch = ''
    }
    createList = (list) => {
        return list.map((item, i) => {
            return(
                <Review obj = {item}
                        key = {i}/>
            )
        })
    }
    @action
    test = () => {
        console.log('test1');
        console.log('sample code')
        axios.get('/api/user/getUserInfo', {
        }).then((res)=>{
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                {this.switch}
                <AddCircleIcon onClick = {this.addReview}/>
                {this.createList(this.reviews)}
            </div>
        )
    }
}
export default Reviews