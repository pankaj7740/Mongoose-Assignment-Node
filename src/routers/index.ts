import {Router} from 'express';
import { routers } from '../controllers/index';

const router = Router();

// router.get("/products",async(req,res)=>{
//      res.send("Hello")
// })
router.use("/products",routers);

export {router};
