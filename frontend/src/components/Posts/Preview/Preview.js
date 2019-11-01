import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {observer} from 'mobx-react'
import './Preview.scss'
@observer
class Preview extends Component {
    render() {
        return (
            <div className = 'PreviewBox'>
                <NavLink className = 'postLink' to = {{
                    pathname: `/post/${this.props.obj.post_id}`,
                    state: { 
                        title: this.props.obj.title,
                        content: this.props.obj.content
                    }
                }}>
                    <h3 className = 'PreviewTitle'>
                        {this.props.obj.title}
                    </h3>
                </NavLink>
                <div className = 'horizon'/>
                <div className = 'PreviewContent'>
                    {this.props.obj.preView}
                </div>
            </div>
        )
    }
}
export default Preview