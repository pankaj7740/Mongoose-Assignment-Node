import express, { Router } from "express";
// import { routers } from '../controllers/index';
import {
  productRouter,
  userRouter,
  farmRouters,
  productHeadRouter,
  fileRouter,
} from "../controllers";

const router = Router();
 router.use(express.json());
 router.use("/passport",userRouter);
 router.use("/products",productRouter);
 router.use("/upload",fileRouter);
 router.use("/farm",farmRouters);
 router.use("/producthead",productHeadRouter);
export { router };
