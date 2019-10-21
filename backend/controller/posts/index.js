import express from 'express'
import controller from './postsController.js'

const router = express.Router();

router.post('/savePost',controller.savePost)
router.get('/posts',controller.posts)

module.exports = router;