import express from 'express';
import user from './user';
import oauth from './oauth';
import posts from './posts';
import authMiddleware from './middlewares/auth';

const apiRouter = express.Router();

apiRouter.use('/user',  user)
apiRouter.use('/oauth', oauth)
apiRouter.use('/posts', authMiddleware)
apiRouter.use('/posts', posts)

module.exports = apiRouter;