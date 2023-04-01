import express, { Router } from "express";
import {
  productRouter,
  userRouter,
  farmRouters,
  productHeadRouter,
  fileRouter,
  profileRouter
} from "../controllers";

const router = Router();
 router.use(express.json());
 router.use("/profile",profileRouter)
 router.use("/user",userRouter);
 router.use("/products",productRouter);
 router.use("/upload",fileRouter);
 router.use("/farm",farmRouters);
 router.use("/producthead",productHeadRouter);
export { router };
