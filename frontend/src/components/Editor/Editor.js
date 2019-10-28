import React from 'react'
import marked from 'marked'
import { observer } from "mobx-react"
import {observable, action} from 'mobx'
import Prism from 'prismjs'
import cx from 'classnames'
import TextField from '@material-ui/core/TextField'
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-go.min';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-java.min';
import 'prism-themes/themes/prism-material-dark.css'
//if you want another themes that choose one in node_modules/prism-themes/themes/another
const Editor = () => {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight(code, lang) {
            return Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup, lang);
        },
    })
    const handleChange = (e) => {
        document.getElementById('content').innerHTML = marked(e.target.value)
    }
    return (
        <div className = 'EditorBox'>
            <TextField 
                className = 'content'
                id="filled-multiline-flexible"
                label="Content"
                multiline
                scmargin="normal"
                onChange={handleChange}
                variant="filled"/>
            <div id='content' className={cx('material-dark', 'markdownView')}/>
        </div>
    );
}
export default (observer(Editor));