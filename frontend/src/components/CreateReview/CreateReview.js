import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import './CreateReview.scss'
@observer
class CreateReview extends Component {
    render() {
        console.log(this.props.obj)
        return (
            <div className = 'reviewBox'>
                <div>
                    {this.props.obj.title}
                </div>
                <div>
                    {this.props.obj.content}
                </div>
            </div>
        )
    }
}
export default CreateReview