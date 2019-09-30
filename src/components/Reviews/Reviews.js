import React, { Component } from 'react'
import {observable, action} from 'mobx'
import AddCircleIcon from '@material-ui/icons/AddCircle';
export default class Reviews extends Component {
    @action
    addReview = () => {

    }
    render() {
        return (
            <div>
                
                <AddCircleIcon onClick = {this.addReview}/>
            </div>
        )
    }
}
