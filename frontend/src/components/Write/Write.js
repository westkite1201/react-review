import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer, inject} from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import MarkdownRenderer from '../MarkdownRenderer';
import './Write.scss'
const marks = [
    {value:0,label:'none'},
    {value:1,label:'10sec'},
    {value:2,label:'10min'},
    {value:3,label:'30min'},
    {value:4,label:'1hours'},
    {value:5,label:'1day'},
    {value:6,label:'1day'},
    {value:7,label:'1week'},
    {value:8,label:'1month'}
]
const style = {
    height: '95%',
    overflowX: 'unset',
    overflowY: 'auto',
    padding: '10px',
    borderBottom: '1px solid darkgray'
}
let title = ''

class Write extends Component {
    @observable timeValue = 'none';
    @observable content = '';
    handleUpload = () => {
        if(title && this.content){
            let obj = {
                title: title,
                content: this.content
            }
            this.props.pullInput(obj, this.timeValue)
            this.props.history.push('/');
        }
    }
    handleTime = (e, index) => {
        this.timeValue = marks[index].label;
    }
    handleTitle = (e) => {
        title = e.target.value;
    }
    @action
    handleContent = (e) =>{
        this.content = e.target.value
    }

    render() {
        return (
            <div className = 'formBox'>
                <TextField
                    className = 'title'
                    onChange  = {this.handleTitle}
                    label     = "Title"
                    scmargin  = "normal"
                    variant   = "filled"
                />
                <textarea
                    className   = 'contentBox'
                    placeholder = 'Content'
                    onChange    = {this.handleContent}
                />
                <MarkdownRenderer content = {this.content} css = {style}/>
                <Slider
                    className         = 'timeSlider'
                    aria-labelledby   = "continuous-slider"
                    step              = {1}
                    onChangeCommitted = {this.handleTime}
                    max               = {8}
                    marks             = {marks}
                />
                
                <Button 
                    className = 'uploadButton'
                    varient   = 'contained' 
                    color     = 'primary' 
                    onClick   = {this.handleUpload}>
                    upload
                </Button>
            </div>
        )
    }
}
export default inject(({posts}) => ({
    pullInput     : posts.pullInput
}))(observer(Write))