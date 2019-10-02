import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
@observer
class Reviews extends Component {
    @observable reviews = [];
    @observable switch = '';
    @action
    addReview = () => {
        console.log("object")
        if(this.switch===''){
            console.log('in')
            this.switch = <div>title and content input</div>
        }else{
            this.switch = ''
        }
    }
    render() {
        return (
            <div>
                {this.reviews}
                {this.switch}
                <AddCircleIcon onClick = {this.addReview}/>
            </div>
        )
    }
}
export default Reviews
