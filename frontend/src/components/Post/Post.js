import React, { Component } from 'react'
import { observer } from 'mobx-react'
import MarkDownRenderer from '../MarkdownRenderer'
import './Post.scss'

class Post extends Component {
    render() {
        const {title, content} = this.props.location.state;
        return (
            <div className = 'PostRoot'>
                <div className = 'postBox'>
                    <h1 className = 'title'>
                        {title}
                    </h1>
                    <div className = 'horizon'/>
                    <div className = 'content'>
                        <MarkDownRenderer content = {content}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default (observer(Post))