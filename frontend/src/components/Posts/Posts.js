import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {NavLink} from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import Preview from './Preview'
import './Posts.scss'
@observer
class Posts extends Component {
    componentDidMount(){
        if(this)
        this.props.setUpList()
    }
    createList = (list) => {
        return list.map((item, i) => {
            return(
                <Preview obj = {item}
                        key = {i}/>
            )
        })
    }
    render() {
        return (
            <div className = 'PostsRoot'>
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
}))(observer(Posts));