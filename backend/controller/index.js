import express from 'express';
import user from './user';
import oauth from './oauth';



const apiRouter = express.Router();

apiRouter.use('/user',user)
apiRouter.use('/oauth',oauth)

module.exports = apiRouter;