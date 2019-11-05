#!/usr/bin/env node

/**
 * Module dependencies.
 */
const dotenv  = require('dotenv').config();
const fs      = require('fs');
const webpush = require('web-push');
const app     = require('../app');
const debug   = require('debug')('backend:server');
const http    = require('http');
const https   = require('https');

if(!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY){
  const vapidKeys = webpush.generateVAPIDKeys();

  fs.appendFile('.env',('VAPID_PUBLIC_KEY=' + vapidKeys.publicKey+'\r\n'),
  (err) => {console.log(err);});
  fs.appendFile('.env',('VAPID_PRIVATE_KEY=' + vapidKeys.privateKey+'\r\n'),
  (err) => {console.log(err);});

  // webpush.setGCMAPIKey('AAAAEdy7Rd8:APA91bHG7bo00Hdx-e5YxvMxmA3cw9Wg6V0x41O77ICjPmSV_ffCEmFv1zxavC4Sp0sm-xqAWh4NCpoUinpxcXqJc48o79wPVecHwAHzpW6qMWrEq-3Ng9IFRcymG6QrlrmMkvvTXS5Pgbkajp1bvYcLtPH7u6B4jQ'); //firebase server key
  process.env.VAPID_PUBLIC_KEY  = vapidKeys.publicKey;
	process.env.VAPID_PRIVATE_KEY = vapidKeys.privateKey;
}
webpush.setVapidDetails(
  'mailto:wengers1004@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */
const option = process.env.NODE_ENV === 'production' ? {
  key:fs.readFileSync('../../../../../etc/letsencrypt/live/remindernote.tk/privkey.pem'),
  cert:fs.readFileSync('../../../../../etc/letsencrypt/live/remindernote.tk/cert.pem')
} : '';
var server = process.env.NODE_ENV === 'production' ? 
              https.createServer(option, app) : http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
