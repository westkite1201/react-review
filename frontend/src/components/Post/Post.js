import React, { Component } from 'react'
import { observer } from 'mobx-react'
import MarkDownRenderer from '../MarkdownRenderer'
import './Post.scss'

class Post extends Component {
    render() {
        const {title, content} = this.props.location.state;
        return (
            <div className = 'reviewBox'>
                <h3 className = 'title'>
                    {title}
                </h3>
                <div className = 'content'>
                    <MarkDownRenderer content = {content}/>
                </div>
            </div>
        )
    }
}
export default (observer(Post))