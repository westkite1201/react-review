import express from 'express'
import controller from './userController.js'

const router = express.Router();

router.get('/getUserInfo', controller.getUserInfo)

export default router;