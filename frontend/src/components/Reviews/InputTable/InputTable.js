import React, { Component } from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './InputTable.scss'
@observer
class InputTable extends Component {
    handleUpload = () => {
        let obj = {
            title: document.getElementById('filled-name').value,
            content: document.getElementById('filled-multiline-flexible').value
        }
        this.props.pullInput(obj)
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
