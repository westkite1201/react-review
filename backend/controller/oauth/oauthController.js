import {google} from 'googleapis'
import googleClient from '../../config/google.json'
import dao from "../../model/mariaDB/userDao";
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

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope : scopes
})
function getGoogleApi(auth) {
  return google.oauth2({ version:'v2', auth});
}
async function googleLogin(code) {
  try{
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    oauth2Client.on('tokens', (tokens) => {
      console.log('tokens!!: ',tokens)
      if(tokens.refresh_token){
        console.log('리프레시 토큰: ', tokens.refresh_token);
      }
      console.log('access token: ', tokens.access_token);
    });
    try{
      const login = getGoogleApi(oauth2Client);
      let res = await login.userinfo.v2.me.get();
      return res.data;
    } catch(err){
      console.log(err)
    } 
  } catch (err){
    console.log(err)
  }
}
const callback = (req, res) => {
    return res.send(url);
}
const googleCallback = async (req, res, next) => {
    try{
        const info = await googleLogin(req.query.code);
        console.log('info: ',info);
        dao.params.user_id = info.id;    
        const conn = await dao.connect().getConnection();
        const rows = await dao.checkSignUp(conn);
        console.log(rows[0])
        if(rows[0]==undefined){
            dao.params.user_id = info.id;
            dao.params.name = info.name;
            dao.params.nickname = info.name;
            const result = await dao.signUp(conn);
            console.log(result)
            conn.end();
        }
        conn.end();
        res.redirect('http://localhost:3000');
        
    }catch (err) {
        next(err);
    }
    
    
}
module.exports = {
    callback: callback,
    googleCallback: googleCallback
}