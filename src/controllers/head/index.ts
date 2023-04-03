import express,{Request,Response} from "express";
import mongoose from "mongoose";
import { IProductHead, makeResponse } from "../../lib";
import {  Head } from "../../models";
import { createProductHead } from "../../services";

export const productHeadRouter = express();

productHeadRouter.post("/head", async (req: Request, res: Response) => {
    try {
      const productBody = req.body;
      const product: IProductHead = new Head({
        _id: new mongoose.Types.ObjectId(),
        ...productBody,
      });
      const createdProduct = await createProductHead(product);
      makeResponse(res,200,true,"Ok",createdProduct);
    } catch (err:any) {
      makeResponse(res,200,true,err.message,undefined);
    }
  });