import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { Product, User } from "../../models";
import { IProduct, IUser } from "../../lib";
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
        console.log(token);
        res.status(201).send(token);
      }
    );
  } catch (err) {
    res.status(500).send({
      err:"Server side problem"
    });
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
      res.status(201).send({
        status: true,
        message: "Ok",
        data: createdProduct,
      });
    } catch (error: any) {
      res.status(500).send({
        status: false,
        message: "Product couldn't Be created",
      });
    }
  }
);

productRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const products: any = await getAllProducts();
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

productRouter.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const productId = req.params.id;
      const product = await getProductById(productId);
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
      message: "couldn't find product using Id",
    });
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
        message: "Couldn't be updated",
      });
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
        res.status(200).send({
          status: true,
          message: "Ok",
          data: deletedProduct,
        });
      } else {
        res.status(400).send({
          message: "Id is not valid",
        });
      }
    } catch (error: any) {
      res.status(400).send({
        status: false,
        message: "Product removed Faild",
      });
    }
  }
);
