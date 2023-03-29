import express,{Request,Response} from "express";
import mongoose from "mongoose";
import { IProductHead } from "../../lib";
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
      res.status(200).send({
        status: true,
        message: "Ok",
        data: createdProduct,
      });
    } catch (err) {
      res.status(400).send({
        status: false,
        message: "Product body is not valid",
      });
    }
  });