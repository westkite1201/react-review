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
                <h3 className = 'title'>
                    {this.props.obj.title}
                </h3>
                <div className = 'content'>
                    {this.props.obj.preView}
                </div>
            </div>
        )
    }
}
export default Review