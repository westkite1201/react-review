import {observable, action, computed} from 'mobx';
import marked from 'marked'
import Prism from 'prismjs'
import axios from "axios";
import { toast } from 'react-toastify'
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
    @observable notiFlag = false;
    @observable auth = '';
    @observable jwt = localStorage.getItem('jwt')


    successSetPosts = () => {
        toast.success("Success Set POSTS!", {
            position: toast.POSITION.TOP_CENTER
        });
    }
    
    errorSetPosts = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
        });
    }
    
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
            this.posts.splice(0, 0,  obj)
        }).catch( err => {
            console.log(err.response)
            this.errorSetPosts('죄송합니다. 에러가 발생했어요 ㅠ')
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
        let jwt = localStorage.getItem('jwt');
        if(jwt && !this.posts.length){
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
            }).catch(err=>{
                console.log(err)
                this.errorSetPosts('죄송합니다. 에러가 발생했어요 ㅠ')
            })
        }
    }
    @action
    renderToMarkdown = (content) => {
        return marked(content)
    }
    @action
    logout =() => {
        this.posts = []
        this.jwt = ''
        localStorage.setItem('jwt', '')
    }
    @action
    login = (jwt) => {
        this.jwt = jwt
        this.notiFlag = true
    }
    @action
    setAuth = (param) => {
        this.auth = param;
    }
}