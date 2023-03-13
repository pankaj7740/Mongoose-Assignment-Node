import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { IProduct, Product } from "../models";
import { validateProductBody, validateProductId } from "../middlewares";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../services";

export const routers = express();

routers.use(express.json());

routers.post("/",validateProductBody, async (req: Request, res: Response) => {
  try {
    const productBody = req.body;
    const product: IProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      ...productBody,
    });
    const createdProduct = await createProduct(product);
    res.status(201).send({
      status: true,
      message: "Ok",
      data: createdProduct,
    });
  } catch (error: any) {
    res.status(500).send({
      status: false,
      message: "couldn't Be created",
    });
  }
});

routers.get("/", async (req: Request, res: Response) => {
  try {
    const products: any = await getAllProducts()
    res.status(200).send({
      status: true,
      message: "Ok",
      data: products,
    });
  } catch (error: any) {
    res.status(400).send({
      status: false,
    });
  }
});

routers.get("/:id", async (req: Request, res: Response) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const productId = req.params.id;
      const product = await getProductById(productId);
      res.status(200).send({
        status: true,
        message: "Ok",
        data: product,
      });
    }else{
        res.status(400).send({
            message:"Id is not valid"
        })
    }
  } catch (error: any) {
    res.status(400).send({
      status: false,
      message: "couldn't find",
    });
  }
});

routers.put("/:id", validateProductBody, async (req: Request, res: Response) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const productId = req.params.id;
      const productBody = req.body;
      const product = await updateProductById(productId, productBody);
      res.status(200).send({
        status: true,
        message: "Ok",
        data: product,
      });
    } else {
      res.status(400).send({
        message: "Id is not valid",
      });
    }
  } catch (error: any) {
    res.status(400).send({
      status: false,
      message: "couldn't find",
    });
  }
});
routers.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const productId = req.params.id;
      const deletedProduct = await deleteProductById(productId);
      res.status(200).send({
        status: true,
        message: "Ok",
        data: deletedProduct,
      });
    }else{
        res.status(400).send({
            message:"Id is not valid"
        })
    }
  } catch (error:any) {
    res.status(400).send({
      status: false,
      message: "couldn't find",
    });
  }
});
