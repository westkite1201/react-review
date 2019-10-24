import {observable, action, computed} from 'mobx';
import axios from "axios";
export default class PostsStore {
    @observable posts = [];
    @action 
    pullInput = (obj, timeValue) =>{
        this.posts.push(obj)
        localStorage.setItem('mylist', JSON.stringify(this.posts))
        axios.post('/api/posts/savePost',
            { obj: obj },
            { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
        ).then( (res) => {
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
    setUpList = (list) => {
        this.posts = list;
    }

}