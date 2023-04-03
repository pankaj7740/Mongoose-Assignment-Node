import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { Product, User } from "../../models";
import { IProduct, IUser, makeResponse } from "../../lib";
import {
  createProduct,
  createUser,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../../services";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { verifyToken, validateProductBody } from "../../middlewares";


export const productRouter = express();

productRouter.post("/auth", async (req: Request, res: Response) => {
  try {
    const userBody = req.body;
    const user: IUser = new User({
      _id: new mongoose.Types.ObjectId(),
      ...userBody,
    });
    await createUser(user);
    jwt.sign(
      { user },
      String(process.env.SECRET_KEY),
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;
       makeResponse(res,201,true,"Ok",token);
      }
    );
  } catch (err:any) {
    makeResponse(res,400,false,err.message,undefined)
  }
});

productRouter.post(
  "/",
  validateProductBody,
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const productBody = req.body;
      const product: IProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...productBody,
      });
      const createdProduct = await createProduct(product);
      makeResponse(res,201,true,"Ok",createdProduct);
    } catch (error: any) {
      makeResponse(res,400,false,error.message,undefined);
    }
  }
);

productRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const products: any = await getAllProducts();
    makeResponse(res,200,true,"Ok",products);
  } catch (error: any) {
    makeResponse(res,400,false,error.message,undefined)
  }
});

productRouter.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const productId = req.params.id;
      const product = await getProductById(productId);
      makeResponse(res,200,true,"Ok",product);
    } else {
      makeResponse(res,400,false,"Id is not valid",undefined)
    }
  } catch (error: any) {
    makeResponse(res,400,false,error.message,undefined)
  }
});

productRouter.put(
  "/:id",
  validateProductBody,
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const productId = req.params.id;
        const productBody = req.body;
        const product = await updateProductById(productId, productBody);
        makeResponse(res,200,true,"Ok",product)
      } else {
        makeResponse(res,400,false,"Id is not valid",undefined)
      }
    } catch (error: any) {
      makeResponse(res,400,false,error.message,undefined)
    }
  }
);
productRouter.delete(
  "/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const productId = req.params.id;
        const deletedProduct = await deleteProductById(productId);
        makeResponse(res,200,true,"Product deleted successfully",deletedProduct);
      } else {
        makeResponse(res,400,false,"Id is not valid",undefined);
      }
    } catch (error: any) {
      makeResponse(res,400,false,error.message,undefined);
    }
  }
);
