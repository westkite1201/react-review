import {observable, action, computed} from 'mobx';
import marked from 'marked'
import Prism from 'prismjs'
import axios from "axios";

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

export default class PostsStore {
    @observable posts = [];
    @action 
    pullInput = (obj, timeValue) => {
        axios.post('/api/posts/savePost',
            { obj: obj },
            { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
        ).then( (res) => {
            let preView = '';
            marked.lexer(obj.content).forEach(item => {
                if(item.text){
                    preView += item.text+' '
                }
            })

            obj.preView = preView
            obj.post_id = res.data.insertId
            this.posts.push(obj)
            localStorage.setItem('mylist', JSON.stringify(this.posts))
            console.log(res)
        }).catch( err => {
            console.log(err.response)
            //err 유형에 따른 처리 로직 추가해야 함
        })
        if(timeValue !== 'none'){
            axios.post('/api/notification/',
                    { message: obj, time: timeValue },
                    { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
            ).then(res => {
                console.log(res)
            })
        }
    }
    @action 
    setUpList = () => {
        let postsList = localStorage.getItem('mylist');
        if(!postsList){
            let jwt = localStorage.getItem('jwt'); 
            if(jwt){
                axios.get('/api/posts/posts', {
                    headers: {
                        'Authorization': 'bearer '+ jwt
                    }
                }).then( res =>{
                    res.data.forEach(element => {
                        let preView = ''
                        marked.lexer(element.content).forEach(item => {
                            if(item.text){
                                preView += item.text + ' '
                            }
                        })
                        element.preView = preView
                        this.posts.push(element)
                    });
                    localStorage.setItem('mylist', JSON.stringify(this.posts));
                })
            }
        }else{
            this.posts = JSON.parse(postsList);
            // this.posts = postsList
        }
    }
    @action
    renderToMarkdown = (content) => {
        return marked(content)
    }
}