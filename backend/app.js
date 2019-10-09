const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const api = require('./controller');
const app = express();
const {google} = require('googleapis');
let googleClient = require('./config/google.json');
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
      if(tokens.refresh_token){
        console.log('리프레시 토큰: ', tokens.refresh_token);
      }
      console.log('access token: ', tokens.access_token);
    });
    try{
      const login = getGoogleApi(oauth2Client);
      let res = await login.userinfo.v2.me.get();
      console.log(res.data)
      return res.data;
    } catch(err){
      console.log(err)
    } 
  } catch (err){
    console.log(err)
  }
}
app.get('/login', cors(), function(req, res){
  return res.send(url);
})
app.get('/googleCallback', async function (req, res){
  const displayName = await googleLogin(req.query.code);
  console.log(displayName)
  res.redirect('http://localhost:3000');
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
