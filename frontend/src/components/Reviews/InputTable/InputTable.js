import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './InputTable.scss'
@observer
class InputTable extends Component {
    handleUpload = () => {
        let title = document.getElementById('filled-name').value
        let content = document.getElementById('filled-multiline-flexible').value 
        if(title && content){
            let obj = {
                title: title,
                content: content
            }
            this.props.pullInput(obj)
        }
    }
    render() {
        return (
            <div className = ''>
                <form className = 'formBox'>
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
                    <Button varient = 'contained' color = 'primary' onClick = {this.handleUpload}>
                        upload
                    </Button>
                </form>
            </div>
        )
    }
}
export default InputTable
