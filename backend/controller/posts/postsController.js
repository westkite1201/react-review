import {google} from 'googleapis'
import googleClient from '../../config/google.json'
import dao from "../../model/mariaDB/postsDao";
import jwt from 'jsonwebtoken'

const checkSignUp = async (info) =>{
    dao.params.user_id = info.id;    
    const conn = await dao.connect().getConnection();
    const rows = await dao.checkSignUp( conn );
    console.log(rows[0]);
    if(rows[0] == undefined){
        dao.params.user_id = info.id;
        dao.params.name = info.name;
        dao.params.nickname = info.name;
        const result = await dao.signUp( conn );
        console.log( result );
    }
    conn.end();
}
const savePost = async (req, res) => {
    console.log(req.body.obj)
    console.log(req.decoded)
    dao.params.user_id = req.decoded.id;
    dao.params.content = req.body.obj.content;
    dao.params.title   = req.body.obj.title;
    const conn = await dao.connect().getConnection();
    const rows = await dao.savePost(conn);
    console.log(rows);
    conn.end();
    res.send(rows);
}
const getPosts = async (req, res) => {
    dao.params.user_id = req.decoded.id;
    const conn = await dao.connect().getConnection();
    const rows = await dao.getPosts(conn);
    console.log(rows)    
    conn.end();
    res.send(rows)
}
module.exports = {
    savePost: savePost,
    posts: getPosts
}