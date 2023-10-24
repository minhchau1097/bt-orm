import express from 'express';
import userRoote from './UserRoutes.js';
import imageRoote from './imageRoutes.js';


const rootRoute = express.Router();

rootRoute.use('/user',userRoote);
rootRoute.use('/image',imageRoote);

export default rootRoute;