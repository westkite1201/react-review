import express from 'express'
import controller from './oauthController.js'

const router = express.Router();

router.post('/sendToken',controller.sendToken)

module.exports = router;