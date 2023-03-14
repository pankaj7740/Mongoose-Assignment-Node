import {Router} from 'express';
import { routers } from '../controllers/index';

const router = Router();

router.use("/products",routers);


export {router};
