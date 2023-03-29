import {Router} from 'express';
import { routers } from '../controllers/index';

const router = Router();
router.use('/passport',routers);
router.use("/pop",routers);
router.use("/upload",routers);
router.use("/login",routers);
router.use("/products",routers);



export {router};
