import express from 'express'
import controller from './oauthController.js'
const cors = require('cors');
const router = express.Router();

router.get('/login', cors(), controller.callback)
router.get('/googleCallback', controller.googleCallback)
module.exports = router;