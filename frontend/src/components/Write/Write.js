import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer, inject} from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
 
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
let timeValue = 'none'
@observer
class Write extends Component {
    handleUpload = () => {
        let title = document.getElementById('filled-name').value
        let content = document.getElementById('filled-multiline-flexible').value 
        if(title && content){
            let obj = {
                title: title,
                content: content
            }
            this.props.pullInput(obj, timeValue)
            this.props.history.push('/');
        }
    }
    handleChange = (e, index) => {
        timeValue = marks[index].label;
    }
    render() {
        return (
            <div className = 'formBox'>
                <TextField
                    id="filled-name"
                    label="Title"
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-flexible"
                    label="Content"
                    multiline
                    scmargin="normal"
                    variant="filled"
                />
                <Slider
                    className = 'timeSlider'
                    aria-labelledby="continuous-slider"
                    step={1}
                    onChangeCommitted = {this.handleChange}
                    max = {8}
                    marks={marks}
                />
                <Button varient = 'contained' color = 'primary' onClick = {this.handleUpload}>
                    upload
                </Button>
            </div>
        )
    }
}
export default inject(({posts}) => ({
    pullInput: posts.pullInput
}))(observer(Write))