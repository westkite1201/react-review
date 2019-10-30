import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {NavLink} from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import Review from './Review/Review'
import './Reviews.scss'
@observer
class Reviews extends Component {
    componentDidMount(){
        this.props.setUpList()
    }
    createList = (list) => {
        console.log(list)
        return list.map((item, i) => {
            return(
                <Review obj = {item}
                        key = {i}/>
            )
        })
    }
    render() {
        console.log(this.props.posts)
        return (
            <div className = 'ReviewsRoot'>
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
}))(observer(Reviews));