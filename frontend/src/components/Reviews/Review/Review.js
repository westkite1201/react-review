import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import './Review.scss'
@observer
class Review extends Component {
    render() {
        console.log(this.props.obj)
        return (
            <div className = 'reviewBox'>
                <div className = 'title'>
                    {this.props.obj.title}
                </div>
                <div className = 'content'>
                    {this.props.obj.content}
                </div>
            </div>
        )
    }
}
export default Review