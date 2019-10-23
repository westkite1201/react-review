import express from 'express'
import controller from './userController.js'

const router = express.Router();

router.put('/subscribe_info', controller.insertSubscribe_info)
router.delete('/subscribe_info', controller.deleteSubscribe_info)
module.exports = router;