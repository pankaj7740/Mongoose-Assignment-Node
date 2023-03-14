import express, { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {
  IProduct,
  Product,
  IUser,
  User,
} from "../models";
import {
  validateProductBody,
  validateProductId,
  verifyToken,
} from "../middlewares";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createUser
} from "../services";

export const routers = express();

routers.use(express.json());

const secretkey = "secretKey";

routers.post("/auth",async (req: Request, res: Response) => {
  try {
    const userBody = req.body;
    const user :IUser = new User({
      _id: new mongoose.Types.ObjectId(),
      ...userBody,
    });
    await createUser(user);
    jwt.sign({ user }, secretkey, {expiresIn:'200s'}, (err, token) => {
      if (err) throw err;
      res.status(201).send(token);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

routers.post(
  "/",
  verifyToken,
  validateProductBody,
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

routers.get("/", verifyToken, async (req: Request, res: Response) => {
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

routers.get("/:id",verifyToken, async (req: Request, res: Response) => {
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

routers.put(
  "/:id",verifyToken,
  validateProductBody,
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
routers.delete("/:id",verifyToken, async (req: Request, res: Response) => {
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
});

// routers.post("/abc", async (req: Request, res: Response) => {
//   try {
//     const productBody = req.body;
//     const product: IProductHead = new ProdctHead({
//       _id: new mongoose.Types.ObjectId(),
//       ...productBody,
//     });
//     const createdProduct = await createProduct1(product);
//     res.status(200).send(createdProduct);
//   } catch (err) {
//     res.status(400).send({
//       status: false,
//       message: "Product body is not valid",
//     });
//   }
// });

// routers.post("/def", async (req, res) => {
//   try {
//     const farmBody = req.body;
//     const farm: IFarm = new Farm({
//       _id: new mongoose.Types.ObjectId(),
//       ...farmBody,
//     });
//     res.status(200).send({
//       status: true,
//       message: "Ok",
//       data: farm,
//     });
//   } catch (err) {
//     res.status(400).send({
//       status: false,
//       message: "Farm body is not valid",
//     });
//   }
// });
// routers.get("/:id",async(req:Request,res:Response)=>{
//     const id = req.params.id;
// })
