import React, {useEffect} from 'react'
import Prism from 'prismjs'
import { observer, inject } from "mobx-react"
import cx from 'classnames'
import 'prismjs/components/prism-bash.min'
import 'prismjs/components/prism-typescript.min'
import 'prismjs/components/prism-javascript.min'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-css.min'
import 'prismjs/components/prism-python.min'
import 'prismjs/components/prism-go.min'
import 'prismjs/components/prism-scss.min'
import 'prismjs/components/prism-java.min'
import 'prism-themes/themes/prism-material-dark.css'
import './MarkdownRenderer.scss'
//if you want another themes that choose one in node_modules/prism-themes/themes/another

const MarkdownRenderer = ({content, css, renderToMarkdown}) => {
    useEffect(() => {
        if(document.getElementById('content')){
            document.getElementById('content').innerHTML =renderToMarkdown(content)
        }
    },[])
    if(document.getElementById('content')){
        document.getElementById('content').innerHTML = renderToMarkdown(content)
    }
    return (
        <div className = {cx('MarkdownRendererBox', css)} >
            <div id='content' className={cx('material-dark', 'markdownView')}/>
        </div>
    );
}
export default inject(({posts})=> ({
    renderToMarkdown: posts.renderToMarkdown 
}))(observer(MarkdownRenderer))