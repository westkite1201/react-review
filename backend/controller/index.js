import express from 'express';
import user from './user';




const apiRouter = express.Router();

apiRouter.use('/user',user)

module.exports = apiRouter;