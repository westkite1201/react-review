import {google} from 'googleapis'
import googleClient from '../../config/google.json'
import dao from "../../model/mariaDB/userDao";
import jwt from 'jsonwebtoken'
import { resolve } from 'upath';
const googleConfig = {
    clientId: googleClient.web.client_id,
    clientSecret: googleClient.web.client_secret,
    redirect: googleClient.web.redirect_uris[0]
}
const oauth2Client = new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
)
const sendToken = async (req, res) => {
    console.log(req.headers)
    console.log(req.headers.authorization.split(' ')[1])
    let jwt = await oauth2Client.verifyIdToken({idToken: req.headers.authorization.split(' ')[1],audience: googleConfig.clientId});
    let user = {id:jwt.payload.sub, name:jwt.payload.name}
    await checkSignUp(user)
    return res.send(await createToken(user))
}
const createToken = (user) => {
    const promise = new Promise((resolve, reject)=>{
        jwt.sign(
            {
                id: user.id,
                name: user.name
            },
            googleClient.web.client_secret,
            {
                expiresIn: '1d',
                issuer: 'jongwon',
                subject: 'userinfo'
            }, (err, token) => {
                if(err) reject(err)
                resolve(token)})
    })
    return promise
}
const checkSignUp = async (info) =>{
    dao.params.user_id = info.id;    
    const conn = await dao.connect();
    const rows = await dao.checkSignUp( conn );
    console.log(rows[0]);
    if(rows[0] == undefined){
        dao.params.user_id = info.id;
        dao.params.name = info.name;
        dao.params.nickname = info.name;
        const result = await dao.signUp( conn );
        console.log( result );
        
    }
    conn.release();
}
module.exports = {
    sendToken: sendToken
}