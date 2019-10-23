import express from 'express'
import controller from './notiController.js'

const router = express.Router();

router.post('/',controller.pushNotification)
router.get('/vapid', controller.getVAPID)
module.exports = router;