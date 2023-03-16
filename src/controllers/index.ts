import express, { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {
  IProduct,
  Product,
  IUser,
  User,
  Farm,
  IFarm,
  IProductHead,
  Head,
  IFileUpload,
  File
} from "../models";
import {
  validateProductBody,
  validateProductId,
  verifyToken,
  upload
} from "../middlewares";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createUser,
  createProductHead,
  createfarm,
  getProductHeadById,
  UploadFile
} from "../services";

export const routers = express();

routers.use(express.json());


routers.post("/auth",async (req: Request, res: Response) => {
  try {
    const userBody = req.body;
    const user :IUser = new User({
      _id: new mongoose.Types.ObjectId(),
      ...userBody,
    });
    await createUser(user);
    jwt.sign({ user }, String(process.env.SECRET_KEY), {expiresIn:'200s'}, (err, token) => {
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
routers.post("/file",upload.single('file'),async(req:Request,res:Response)=>{
  try{
    const fileBody = req.file;
    
    console.log(fileBody);
    
    const file :IFileUpload = new File({
      _id: new mongoose.Types.ObjectId(),
      ...fileBody
    });
    console.log(file);
    
    const createdFile = await UploadFile(file);
    res.status(201).send({
      status: true,
      message: "Ok",
      data: createdFile,
    });
  }catch(err){
    res.status(500).send({
      status: false,
      message: "File couldn't be uploaded",
    });
  }
})
// routers.post("/multiple",async(req:Request,res:Response)=>{
//   try{
//     const filesBody = req.files;
//     console.log(filesBody);
//     const files :IFileUpload[] = filesBody.map((file: any) => {
//       return new File({
//         _id: new mongoose.Types.ObjectId(),
//       ...file
//       });
//     }

   

//   }catch(err){
//     res.status(500).send({
//       status: false,
//       message: "File couldn't be uploaded",
//     });
//   }
// })



routers.post("/head", async (req: Request, res: Response) => {
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

routers.post("/farm", async (req, res) => {
  try {
    const farmBody = req.body;
    const farm: IFarm = new Farm({
      _id: new mongoose.Types.ObjectId(),
      ...farmBody,
    });
    const createdFarm = await createfarm(farm);
    res.status(200).send({
      status: true,
      message: "Ok",
      data: createdFarm,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: "Farm body is not valid",
    });
  }
});
routers.get("/farm/:id",async(req:Request,res:Response)=>{
  try{
    if(ObjectId.isValid(req.params.id)){
      const farmId = req.params.id;
      const farm = await getProductHeadById(farmId);
      res.status(200).send({
        status: true,
        message: "Ok",
        data: farm,
      });
    }else{
      res.status(400).send({
        message: "Id is not valid",
      });
    }
  }catch(err){
    res.status(400).send({
      status: false,
      message: `couldn't find data ${err}`,
    });

  }
})


